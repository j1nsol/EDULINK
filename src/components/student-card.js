import React from 'react';
import './student-card.css';

const StudentInfo = ({ label, value }) => (
  <p className="student-info">
    <span className="info-label">{label}:</span> {value}
  </p>
);

const StudentCard = () => {
  const studentData = [
    { label: "Name", value: "Jez Xyrel K. Olpoc" },
    { label: "Program", value: "Bachelor of Science in Computer Engineer" },
    { label: "School Year", value: "2024 - 2025" },
    { label: "Year Level", value: "Third Year" },
    { label: "Semester", value: "Second" },
    { label: "Student ID", value: "22-2024-222" }
  ];

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