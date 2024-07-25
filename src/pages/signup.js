import React, { useState } from "react";
import './signup.css';
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import signupbg from "../images/signupbg.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const INITIAL_STUDENT_ID = "24-0000-001";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    familyName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const generateStudentId = async () => {
    let studentId = INITIAL_STUDENT_ID;
    let isAvailable = false;

    while (!isAvailable) {
      // Check if the student ID is already taken
      const q = query(collection(db, "users"), where("studentId", "==", studentId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        isAvailable = true;
      } else {
        // Increment student ID
        const currentIdNum = parseInt(studentId.split('-')[2], 10);
        const newIdNum = (currentIdNum + 1).toString().padStart(3, '0');
        studentId = `24-0000-${newIdNum}`;
      }
    }

    return studentId;
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.middleName} ${formData.familyName}`
      });

      // Generate unique student ID
      const studentId = await generateStudentId();

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        middleName: formData.middleName,
        familyName: formData.familyName,
        email: formData.email,
        studentId: studentId
      });

      console.log('Data saved successfully');
      navigate("/login");
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="frame">
        <div className="signupph1">
          <div className="signupph2">
            <div className="imageContainer">
              <img
                loading="lazy"
                src={signupbg}
                className="imagelogin"
              />
            </div>
            <div className="signupcolumn2">
              <form onSubmit={signUp}>
                <div className="Framer">
                  <div className="Firstnamelabel">First name</div>
                  <input
                    type="text"
                    className="fnamevalue"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <div className="Middlenamelabel">Middle name</div>
                  <input
                    type="text"
                    className="mnamevalue"
                    placeholder="Enter your middle name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                  <div className="Lastnamelabel">Last name</div>
                  <input
                    type="text"
                    className="lastnamevalue"
                    placeholder="Enter your last name"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                  />
                  <div className="Emaillabel">Email</div>
                  <input
                    type="email"
                    className="emailvalue"
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="Passwordlabel">Password</div>
                  <input
                    type="password"
                    className="passwordvalue"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button className="registerbutton" type="submit">Register</button>
                  <div className="signupplaceholder">
                    <div className="bottom-text">Already have an account?</div>
                    <div className="bottom-text"><Link to="/login">Login</Link></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
