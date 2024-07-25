import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './registration.css';
import Sidebar from '../components/sidebar';
import StudentCard from '../components/student-card';

function CurriculumTable() {
  const [curriculumData, setCurriculumData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [termValue, setTermValue] = useState('');
  const [userYearLevel, setUserYearLevel] = useState('');
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [userEnrolledSubjects, setUserEnrolledSubjects] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [conflictRows, setConflictRows] = useState([]);


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
        console.log("Error fetching term value:", error);
      }
    };

    fetchTermValue();
  }, []);


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

  // Fetch curriculum data
  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BSCPE_curriculum"));
        const data = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.term === termValue && item.yearlevel === userYearLevel) 
          .sort((a, b) => parseInt(a.yearlevel) - parseInt(b.yearlevel)); 
        setCurriculumData(data);
      } catch (error) {
        console.log("Error fetching curriculum data:", error);
      }
    };

    if (termValue && userYearLevel) {
      fetchCurriculumData();
    }
  }, [termValue, userYearLevel]);

  useEffect(() => {
    const fetchSectionsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "2324_sections"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched sections data:", data); // Add this line
        setSectionsData(data);
      } catch (error) {
        console.log("Error fetching sections data:", error);
      }
    };
  
    fetchSectionsData();
  }, []);
  
  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "users", user.uid, "SubjectEnrolled"));
          const enrolled = querySnapshot.docs.map(doc => doc.data());
          console.log("Fetched enrolled subjects:", enrolled); // Add this line
          setUserEnrolledSubjects(enrolled);
          const enrolledSubjectCodes = enrolled.map(subject => subject.subjectCode);
          setEnrolledSubjects(enrolledSubjectCodes);
        } catch (error) {
          console.log("Error fetching enrolled subjects:", error);
        }
      }
    };
  
    fetchEnrolledSubjects();
  }, []);


  const getSectionsForSubject = (subjectCode) => {
    return sectionsData
      .filter(section => section.SubjectCode === subjectCode)
      .map(section => ({
        id: section.id,
        description: section.SectionDescription,
        sectionCode: section.Section 
      }));
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(2000, 0, 1, hours, minutes); // Create a Date object with an arbitrary date
  };
  
  // Main function to check for schedule conflicts
  const isConflict = (newSection) => {
    if (!newSection || !newSection.Schedule) return false;
  
    const daysOfWeek = ["Day1", "Day2"];
    const newSchedules = daysOfWeek
      .map(day => newSection.Schedule[day])
      .filter(schedule => schedule);
  
    console.log('User Enrolled Subjects:', userEnrolledSubjects);
    console.log('Sections Data:', sectionsData);
    console.log('New Section Schedules:', newSchedules);
  
    for (const enrolled of userEnrolledSubjects) {
      console.log('Enrolled Subject:', enrolled);
  
      const enrolledSection = sectionsData.find(section => section.id === enrolled.sectionCode);
      console.log('Finding section with ID:', enrolled.sectionCode, 'Result:', enrolledSection);
  
      if (!enrolledSection || !enrolledSection.Schedule) {
        console.log('Enrolled section not found or no schedule:', enrolledSection);
        continue;
      }
  
      const existingSchedules = daysOfWeek
        .map(day => enrolledSection.Schedule[day])
        .filter(schedule => schedule);
  
      console.log('Existing Section Schedules:', existingSchedules);
  
      for (const newSchedule of newSchedules) {
        const newStart = parseTime(newSchedule.StartTime);
        const newEnd = parseTime(newSchedule.EndTime);
  
        for (const existingSchedule of existingSchedules) {
          const existingStart = parseTime(existingSchedule.StartTime);
          const existingEnd = parseTime(existingSchedule.EndTime);
  
          if (newSchedule.DayOfWeek === existingSchedule.DayOfWeek) {
            // Check for overlap
            const isOverlapping = (newStart < existingEnd && newEnd > existingStart);
            if (isOverlapping) {
              console.log('Conflict detected between:', newSchedule, existingSchedule);
              return true;
            }
          }
        }
      }
    }
  
    return false;
  };

  const handleSectionChange = async (subjectCode, sectionCode, sectionDescription) => {
    const user = auth.currentUser;
    if (user) {
      const selectedSection = sectionsData.find(section => section.id === sectionCode);
      
      if (!selectedSection) {
        console.log("Selected section not found.");
        return;
      }
  
      if (isConflict(selectedSection)) {
        alert('Schedule conflict detected. Please choose a different section.');
        return;
      }
      
      try {
        const userDocRef = doc(db, "users", user.uid, "SubjectEnrolled", subjectCode);
        await setDoc(userDocRef, {
          subjectCode,
          sectionCode,
          sectionDescription
        });
        console.log('Subject and section added to user’s SubjectEnrolled collection');
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

  const handleCheckboxChange = async (subjectCode, isChecked) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid, "SubjectEnrolled", subjectCode);
        if (isChecked) {
          await deleteDoc(userDocRef);
          console.log('Subject removed from user’s SubjectEnrolled collection');
        } else {
          // Re-add subject to enrollment if needed
          const subject = userEnrolledSubjects.find(sub => sub.subjectCode === subjectCode);
          if (subject) {
            await setDoc(userDocRef, subject);
            console.log('Subject re-added to user’s SubjectEnrolled collection');
          }
        }
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "SubjectEnrolled"));
        const enrolled = querySnapshot.docs.map(doc => doc.data());
        setUserEnrolledSubjects(enrolled);
        const enrolledSubjectCodes = enrolled.map(subject => subject.subjectCode);
        setEnrolledSubjects(enrolledSubjectCodes);
      } catch (error) {
        console.error('Error updating subject enrollment:', error);
      }
    }
  };

  // Check if there are available sections
  const areSectionsAvailable = (subjectCode) => {
    return getSectionsForSubject(subjectCode).length > 0;
  };

  // Check if the button should be enabled
  const isButtonEnabled = (item) => {
    const section = selectedSchedule[item.id];
    const isSectionSelected = section && section.description !== "Select a section";
    return areSectionsAvailable(item.subjectcode) && !isConflict(section) && isSectionSelected;
  };

  const handleScheduleChange = (item, e) => {
    const selectedSectionDescription = e.target.value;
    if (selectedSectionDescription === "No section available") return;
  
    const section = getSectionsForSubject(item.subjectcode).find(sec => sec.description === selectedSectionDescription);
    setSelectedSchedule(prev => ({
      ...prev,
      [item.id]: section
    }));
  
    if (section && isConflict(section)) {
      setConflictRows(prev => [...prev, item.id]);
    } else {
      setConflictRows(prev => prev.filter(rowId => rowId !== item.id));
    }
  };
  
  const getButtonText = (item) => {
    if (conflictRows.includes(item.id)) {
      return "CONFLICT";
    }
    return "ADD SUBJECT";
  };

  const filteredCurriculumData = curriculumData.filter(item => !enrolledSubjects.includes(item.subjectcode));
  
  return (
    <body>
    <Sidebar />
    <div className="main-container-reg">

      <StudentCard/>
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
              <th>Schedules</th>
              <th style={{width:"125px"}}>Add Schedule</th>
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
                    onChange={(e) => handleScheduleChange(item, e)}
                    value={selectedSchedule[item.id]?.description || ""}
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
                <td>
                  <button
                    className='button-54'
                    onClick={() => {
                      const section = selectedSchedule[item.id];
                      if (section) {
                        handleSectionChange(item.subjectcode, section.sectionCode, section.description);
                        setSelectedSchedule(prev => ({
                          ...prev,
                          [item.id]: null 
                        }));
                      }
                    }}
                    disabled={!isButtonEnabled(item)}
                  >
                    {getButtonText(item)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Enrolled Subjects</h1>
        <table className="centered-table">
          <thead>
            <tr>
              <th>Active</th> {/* Add a column for the checkbox */}
              <th>Subject Code</th>
              <th>Section Code</th>
              <th>Section Description</th>
            </tr>
          </thead>
          <tbody>
            {userEnrolledSubjects.map((subject) => (
              <tr key={subject.subjectCode}>
                <td>
                  <input
                    type="checkbox"
                    checked={true} 
                    onChange={(e) => handleCheckboxChange(subject.subjectCode, !e.target.checked)}
                  />
                </td>
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
