import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import StudentCard from "../components/student-card";
import { db, auth } from '../firebase';
import { collection, getDocs, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEnrolledSubjects, setUserEnrolledSubjects] = useState([]);
  const [userProgramCode, setUserProgramCode] = useState("");
  const [curriculumData, setCurriculumData] = useState({});
  const [tuitionPerHour, setTuitionPerHour] = useState(0);
  const [totalTuition, setTotalTuition] = useState(0);
  const [schoolYear, setSchoolYear] = useState("");
  const [termValue, setTermValue] = useState("");

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

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

          const schoolSettingsDocRef = doc(db, "schoolsettings", "TuitionPerHour");
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

          const schoolSettingsDocRef = doc(db, "schoolsettings", "TuitionPerHour");
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

        const subjectsCollectionRef = collection(db, "users", user.uid, collectionName);
        const querySnapshot = await getDocs(subjectsCollectionRef);
        const enrolledSubjects = querySnapshot.docs.map(doc => doc.data());
        setUserEnrolledSubjects(enrolledSubjects);
      } catch (error) {
        console.error('Error updating subject enrollment:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <StudentCard />
        <div className="container-dashboard">
          <h1>ENROLLED SUBJECTS {schoolYear}</h1>
          <div>
            <table className="account_centered-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Subject Code</th>
                  <th style={{ textAlign: "center" }}>Section Code</th>
                  <th style={{ textAlign: "center" }}>Subject Description</th>
                  <th style={{ textAlign: "center" }}>Contact Hours</th>
                </tr>
              </thead>
              <tbody>
                {userEnrolledSubjects.map((subject) => (
                  <tr key={subject.subjectCode}>
                    <td style={{ textAlign: "center" }}>{subject.subjectCode}</td>
                    <td style={{ textAlign: "center" }}>{subject.sectionCode}</td>
                    <td style={{ textAlign: "center" }}>{curriculumData[subject.subjectCode]?.description || 'N/A'}</td>
                    <td style={{ textAlign: "center" }}>{curriculumData[subject.subjectCode]?.['contact hours'] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
