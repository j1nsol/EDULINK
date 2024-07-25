import React, { useState, useEffect } from 'react';
import './accounttab.css';
import Sidebar from '../components/sidebar';
import { db, auth, storage  } from '../firebase'; // Import db and auth from firebase configuration
import { collection, getDocs, doc, getDoc, deleteDoc, setDoc, addDoc } from 'firebase/firestore';

function Accounttab() {
  const [userEnrolledSubjects, setUserEnrolledSubjects] = useState([]);
  const [userProgramCode, setUserProgramCode] = useState("");
  const [curriculumData, setCurriculumData] = useState({});
  const [tuitionPerHour, setTuitionPerHour] = useState(0);
  const [totalTuition, setTotalTuition] = useState(0);
  const [schoolYear, setSchoolYear] = useState("");
  const [termValue, setTermValue] = useState("");

  useEffect(() => {
    const fetchterm = async () => {
      try {
        const docRef = doc(db, "schoolsettings", "term");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTermValue(data.value); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching school settings:", error);
      }
    };

    fetchterm();


    const fetchSchoolSettings = async () => {
      try {
        const docRef = doc(db, "schoolsettings", "SchoolYear");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchoolYear(data.value); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching school settings:", error);
      }
    };

    fetchSchoolSettings();
  }, []);

  useEffect(() => {
    const fetchEnrolledSubjects = async () => {
      const user = auth.currentUser;
      if (user) {
        try {

          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.data();
          setUserProgramCode(userData.programcode);

          const collectionName = `${schoolYear}_${termValue}_SubjectEnrolled`;


          const subjectsCollectionRef = collection(db, "users", user.uid, collectionName);
          const querySnapshot = await getDocs(subjectsCollectionRef);
          const enrolledSubjects = querySnapshot.docs.map(doc => doc.data());
          setUserEnrolledSubjects(enrolledSubjects);

          const curriculumCollectionRef = collection(db, `${userData.programcode}_Curriculum`);
          const curriculumSnapshot = await getDocs(curriculumCollectionRef);
          const curriculum = {};
          curriculumSnapshot.forEach((doc) => {
            curriculum[doc.id] = doc.data();
          });
          setCurriculumData(curriculum);

          const schoolSettingsDocRef = doc(db, "schoolsettings", "TuitionPerHour"); // Adjust path if needed
          const schoolSettingsDocSnap = await getDoc(schoolSettingsDocRef);
          const schoolSettingsData = schoolSettingsDocSnap.data();
          setTuitionPerHour(schoolSettingsData.value || 0);

        } catch (error) {
          console.error('Error fetching enrolled subjects:', error);
        }
      }
    };

    fetchEnrolledSubjects();
  }, [schoolYear, termValue]);

  useEffect(() => {
    const calculateTotalTuition = () => {
      const totalHours = userEnrolledSubjects.reduce((sum, subject) => {
        const contactHours = curriculumData[subject.subjectCode]?.['contact hours'] || 0;
        return sum + parseFloat(contactHours);
      }, 0);
      setTotalTuition(totalHours * tuitionPerHour);
    };

    calculateTotalTuition();
  }, [userEnrolledSubjects, curriculumData, tuitionPerHour]);

  const handleCheckboxChange = async (subjectCode, isChecked) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Construct the document reference
        const collectionName = `${schoolYear}_${termValue}_SubjectEnrolled`;
        const userDocRef = doc(db, "users", user.uid, collectionName, subjectCode);
        
        if (isChecked) {
          await deleteDoc(userDocRef);
        } else {
          const subject = userEnrolledSubjects.find(sub => sub.subjectCode === subjectCode);
          if (subject) {
            await setDoc(userDocRef, subject);
          }
        }

        // Refresh the enrolled subjects list
        const subjectsCollectionRef = collection(db, "users", user.uid, collectionName);
        const querySnapshot = await getDocs(subjectsCollectionRef);
        const enrolledSubjects = querySnapshot.docs.map(doc => doc.data());
        setUserEnrolledSubjects(enrolledSubjects);
      } catch (error) {
        console.error('Error updating subject enrollment:', error);
      }
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleProceedToPayment = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const collectionName = `Assessment`;
        const assessmentDocRef = collection(db, "users", user.uid, collectionName);
        await addDoc(assessmentDocRef, {
          totalTuition,
          schoolYear,
          termValue,
        });

        // Optionally, you can redirect the user or provide feedback
        alert('Payment assessment has been created successfully!');
      } catch (error) {
        console.error('Error creating payment assessment:', error);
      }
    }
  };

  return (
    <div>
      <Sidebar/>
      <div className="account-tab">
        <div className="main-content">
          <div className="content-container">
            <div className="subject-table-header">
              SUBJECT TABLE
              <div className='account-table'>
                <table className="account_centered-table">
                  <thead>
                    <tr>
                      <th style={{textAlign:"center"}}>Subject Code</th>
                      <th style={{textAlign:"center"}}>Section Code</th>
                      <th style={{textAlign:"center"}}>Subject Description</th>
                      <th style={{textAlign:"center"}}>Contact Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userEnrolledSubjects.map((subject) => (
                      <tr key={subject.subjectCode}>
                        <td>{subject.subjectCode}</td>
                        <td>{subject.sectionCode}</td>
                        <td>{curriculumData[subject.subjectCode]?.description || 'N/A'}</td>
                        <td>{curriculumData[subject.subjectCode]?.['contact hours'] || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="subject-table">
              <div className="table-row">
                <div className="table-cell">
                  <div className="cell-label">Tuition - Academic :</div>
                  <div className="text" style={{alignContent:"center"}}>
                    ${formatNumber(totalTuition.toFixed(2))}
                  </div>
                </div>
                <div className="table-cell">
                  <div className="cell-label">Total amount due:</div>
                  <div className="cell-value">${formatNumber(totalTuition.toFixed(2))}</div>
                </div>
              </div>
              <div className="table-row half-width">
                <div className="table-cell">
                  <div className="cell-label">Miscellaneous :</div>
                  <div className="cell-value">text</div>
                </div>
              </div>
              <div className="table-row half-width">
                <div className="cell-value">text</div>
              </div>
              <div className="table-row half-width">
                <div className="table-cell">
                  <div className="cell-label">Other Fees :</div>
                  <div className="cell-value">text</div>
                </div>
              </div>
              <div className="table-row half-width">
                <div className="cell-value">text</div>
              </div>
              <div className="table-row half-width">
                <div className="table-cell">
                  <div className="cell-label">Laboratory Fees :</div>
                  <div className="cell-value">text</div>
                </div>
              </div>
              <div className="table-footer">
                <div className="footer-column">
                  <div className="cell-value">text</div>
                </div>
                <div className="footer-column">
                  <div className="proceed-button" onClick={handleProceedToPayment}>
                    <div className="button-content">
                      <div className="button-text">PROCEED TO PAYMENTS</div>
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0a73435e2297fbd11d5461c534cb0f523a5084661298b4054ed0d8805ac7a46?apiKey=a38f3cba0a6b4fdbabbbee8891d4e212&" className="button-icon" alt="Proceed icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounttab;
