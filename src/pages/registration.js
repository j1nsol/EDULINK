import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './registration.css';
import Sidebar from '../components/sidebar';

function CurriculumTable() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [termValue, setTermValue] = useState('');
  const [userYearLevel, setUserYearLevel] = useState('');
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [userEnrolledSubjects, setUserEnrolledSubjects] = useState([]);

  // Fetch term value from schoolsettings
  useEffect(() => {
    const fetchTermValue = async () => {
      try {
        const docRef = doc(db, "schoolsettings", "term");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTermValue(docSnap.data().value);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching term value:", error);
      }
    };

    fetchTermValue();
  }, []);

  // Fetch user's year level
  useEffect(() => {
    const fetchUserYearLevel = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserYearLevel(userDocSnap.data().yearlevel);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user year level:", error);
        }
      }
    };

    fetchUserYearLevel();
  }, []);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BSCPE_curriculum"));
        const data = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.term === termValue && item.yearlevel === userYearLevel) // Filter based on term value and user year level
          .sort((a, b) => parseInt(a.yearlevel) - parseInt(b.yearlevel)); // Sort by YearLevel
        setCurriculumData(data);
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      }
    };

    if (termValue && userYearLevel) {
      fetchCurriculumData();
    }
  }, [termValue, userYearLevel]);

  // Fetch sections data
  useEffect(() => {
    const fetchSectionsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "2324_sections"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSectionsData(data);
      } catch (error) {
        console.error("Error fetching sections data:", error);
      }
    };

    fetchSectionsData();
  }, []);

  // Fetch enrolled subjects
  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "users", user.uid, "SubjectEnrolled"));
          const enrolled = querySnapshot.docs.map(doc => doc.data());
          setUserEnrolledSubjects(enrolled);
          const enrolledSubjectCodes = enrolled.map(subject => subject.subjectCode);
          setEnrolledSubjects(enrolledSubjectCodes);
        } catch (error) {
          console.error("Error fetching enrolled subjects:", error);
        }
      }
    };

    fetchEnrolledSubjects();
  }, []);

  // Helper function to get sections for a given subject code
  const getSectionsForSubject = (subjectCode) => {
    return sectionsData
      .filter(section => section.SubjectCode === subjectCode) // Adjusted field name
      .map(section => ({
        id: section.id,
        description: section.SectionDescription,
        sectionCode: section.Section // Added section code
      }));
  };

  // Handle section selection
  const handleSectionChange = async (subjectCode, sectionCode, sectionDescription) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid, "SubjectEnrolled", subjectCode);
        await setDoc(userDocRef, {
          subjectCode,
          sectionCode,
          sectionDescription
        });
        console.log('Subject and section added to user’s SubjectEnrolled collection');
        // Refresh enrolled subjects after adding a new one
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "SubjectEnrolled"));
        const enrolled = querySnapshot.docs.map(doc => doc.data());
        setUserEnrolledSubjects(enrolled);
        const enrolledSubjectCodes = enrolled.map(subject => subject.subjectCode);
        setEnrolledSubjects(enrolledSubjectCodes);
      } catch (error) {
        console.error('Error adding subject and section:', error);
      }
    }
  };

  // Filter out subjects already enrolled by the user
  const filteredCurriculumData = curriculumData.filter(item => !enrolledSubjects.includes(item.subjectcode));

  return (
    <body>
    <div className="main-container-reg">
      <Sidebar/>
      <div className="table-container">
        <h1>Curriculum Table</h1>
        <table className="centered-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Year Level</th>
              <th>Term</th>
              <th>Subject Code</th>
              <th>Description</th>
              <th>Lec Hours</th>
              <th>Lab Hours</th>
              <th>Credited Units</th>
              <th>Contact Hours</th>
              <th>Schedules</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {filteredCurriculumData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.courseid}</td>
                <td>{item.yearlevel}</td>
                <td>{item.term}</td>
                <td>{item.subjectcode}</td>
                <td>{item.description}</td>
                <td>{item['lec hours']}</td>
                <td>{item['lab hours']}</td>
                <td>{item['credited units']}</td>
                <td>{item['contact hours']}</td>
                <td>
                  <select
                    className="schedulebox"
                    onChange={(e) => {
                      const selectedSection = e.target.value;
                      if (selectedSection === "No section available") return;
                      const section = getSectionsForSubject(item.subjectcode)
                        .find(sec => sec.description === selectedSection);
                      if (section) {
                        handleSectionChange(item.subjectcode, section.sectionCode, section.description);
                      }
                    }}
                  >
                    {getSectionsForSubject(item.subjectcode).length === 0 ? (
                      <option value="No section available">No section available</option>
                    ) : (
                      <>
                        <option value="">Select a section</option>
                        {getSectionsForSubject(item.subjectcode).map((section) => (
                          <option key={section.id} value={section.description}>
                            {section.description}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Enrolled Subjects</h1>
        <table className="centered-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Section Code</th>
              <th>Section Description</th>
            </tr>
          </thead>
          <tbody>
            {userEnrolledSubjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.subjectCode}</td>
                <td>{subject.sectionCode}</td>
                <td>{subject.sectionDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </body>
  );
}

export default CurriculumTable;
