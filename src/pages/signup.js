import React, { useState } from "react";
import './signup.css';
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import signupbg from "../images/signupbg.png"
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      console.log(userCredential)
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <>
    <Navbar></Navbar>
    
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
                  />
                <div className="Middlenamelabel">Middle name</div>
                <input 
                    type="text"
                    className="mnamevalue"
                    placeholder="Enter your middle name"
                  />
                <div className="Lastnamelabel">Last name</div>
                <input 
                    type="text"
                    className="lastnamevalue"
                    placeholder="Enter your last name"
                  />
                <div className="Emaillabel">Email</div>
                <input 
                    type="email"
                    className="emailvalue"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                <div className="Passwordlabel">Password</div>
                <input 
                    type="password"
                    className="passwordvalue"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                <button className="registerbutton" type="submit">Register</button>
                <div className="signupplaceholder">
                  <div className="haveanaccount">Already have an account?</div>
                  <div className="logintext"><Link to="/login">Login</Link></div>
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
