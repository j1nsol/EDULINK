import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './student-card.css';

const StudentInfo = ({ label, value }) => (
  <p className="student-info">
    <span className="info-label">{label}:</span> {value}
  </p>
);

const StudentCard = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const getSemesterName = (value) => {
    switch (value) {
      case "1":
        return "First Semester";
      case "2":
        return "Second Semester";
      case "3":
        return "Summer";
      default:
        return "Unknown Semester";
    }
  };

  const getYearName = (value) => {
    switch (value) {
      case "1":
        return "1st Year";
      case "2":
        return "2nd Year";
      case "3":
        return "3rd Year";
        case "4":
        return "4th Year";
      case "5":
        return "5th Year";
      case "6":
        return "6th Year";
      default:
        return "Super Senior";
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);

          const schoolYearDoc = doc(db, 'schoolsettings', 'SchoolYear');
          const schoolYearSnap = await getDoc(schoolYearDoc);
          const schoolYearData = schoolYearSnap.data();

          const semesterDoc = doc(db, 'schoolsettings', 'term');
          const semesterSnap = await getDoc(semesterDoc);
          const semesterData = semesterSnap.data();

          if (docSnap.exists()) {
            const data = docSnap.data();
            setStudentData([
              { label: "Name", value: `${data.firstName} ${data.middleName[0]}. ${data.familyName}` },
              { label: "Program", value: data.program },
              { label: "School Year", value: schoolYearData.value },
              { label: "Year Level", value: getYearName(data.yearlevel) },
              { label: "Semester", value: getSemesterName(semesterData.value) },
              { label: "Student ID", value: data.studentId }
            ]);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No user is signed in.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [auth]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="student-card">
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/910b2e45243cd2181df9989210119c67d43c2c5e2c6a3090da1cbd6d74bf4365?apiKey=a38f3cba0a6b4fdbabbbee8891d4e212&&apiKey=a38f3cba0a6b4fdbabbbee8891d4e212" 
        alt="Student profile picture" 
        className="student-image" 
      />
      <div className="student-details">
        <div className="info-column">
          {studentData.slice(0, 3).map((info, index) => (
            <StudentInfo key={index} label={info.label} value={info.value} />
          ))}
        </div>
        <div className="info-column">
          {studentData.slice(3).map((info, index) => (
            <StudentInfo key={index + 3} label={info.label} value={info.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentCard;
