import React, { useState } from "react";
import './signup.css';
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import signupbg from "../images/signupbg.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    familyName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const signUp = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${formData.firstName} ${formData.middleName} ${formData.familyName}`
        }).then(async () => {
          console.log("User profile updated successfully");

          // Save user data to Firestore
          try {
            await setDoc(doc(db, "users", user.uid), {
              firstName: formData.firstName,
              middleName: formData.middleName,
              familyName: formData.familyName,
              email: formData.email
            });
            console.log('Data saved successfully');

            // Redirect to login page upon successful registration
            navigate("/login");
          } catch (error) {
            console.error('Error saving data:', error);
          }
        }).catch((error) => {
          console.log("Error updating user profile:", error);
        });
      }).catch((error) => {
        console.log(error);
      });
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
