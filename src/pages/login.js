import './login.css';
import Navbar from '../components/navbar';
import React, { useState } from "react";
import loginlogo from "../images/loginlogo.png";
import loginbg from "../images/loginbg.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess('Login successful!'); 
        navigate("/student/dashboard");
      },2000).catch((error) => {
        console.log(error);
        setPassword('');
        setError('Invalid login credentials. Please try again.');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={signIn}>
        <div className="login1">
          <div className="login2">
            <div className="login3">
            {success && <p className="success-message">{success}</p>} 
              <div className="column">
                <div className="login4">
                  <img
                    loading="lazy"
                    srcSet=""
                    className="loginlogo"
                    src={loginlogo}
                    alt="logo"
                  />
                  <div className="login5">
                    <div className="login6">Email</div>
                    <input
                      type="email"
                      className="login7"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="login8">Password</div>
                    <div className="password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="login9"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    <div className="login10">
                      <div className="login11">
                        <div className="login12">Remember me</div>
                      </div>
                      <div className="login13">Forgot password?</div>
                    </div>
                    <div className="login14">
                      <button className="login15" type="submit" name="login">Login</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="login16">Powered by: EDULINK</div>
                  </div>
                </div>
              </div>
              <div className="column-2">
                <div className="login17">
                  <img
                    loading="lazy"
                    src={loginbg}
                    className="img-3"
                    alt="background"
                  />
                  <Link to="/signup">
                    <div className="login18">
                      <div className="login19">Create an account</div>
                    </div>
                  </Link>
                  <div className="login20">Join us to the brighter future!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
