import './login.css';
import Navbar from '../components/navbar';
import * as React from "react";
import loginlogo from "../images/loginlogo.png";
import loginbg from "../images/loginbg.png";

function Login() { // Renamed function to start with a capital letter as per React convention
  return (
    <>
      <Navbar />
      <div className="login1">
        <div className="login2">
          <div className="login3">
            <div className="column">
              <div className="login4">
                <img
                  loading="lazy"
                  srcSet=""
                  className="loginlogo"
                  src={loginlogo} // Use the imported image variable here
                  alt="logo"
                />
                <div className="login5">
                  <div className="login6">ID Number :</div>
                  <input
                    type="text"
                    className="login7"
                    placeholder="Enter your username"
                  />
                  <div className="login8">Password :</div>
                  <input
                    type="password"
                    className="login9"
                    placeholder="Enter your password"
                  />
                  <div className="login10">
                    <div className="login11">
                      <div className="login12">Remember me</div>
                    </div>
                    <div className="login13">Forgot password?</div>
                  </div>
                  <div className="login14">
                    <button className="login15">Login</button>
                  </div>
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
                <div className="login18">
                  <div className="login19">Create an account</div>
                </div>
                <div className="login20">Join us to the brighter future!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
