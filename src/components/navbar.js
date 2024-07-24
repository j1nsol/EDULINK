import * as React from "react";
import { Link } from "react-router-dom";
import navbarlogo from "../images/navbarlogo.png";
import './navbar.css';

function Navbar() {
  return (
    <div className="top-bar">
      <div className="div">
        <Link to="/landing" className="no-underline">
          <img loading="lazy" src={navbarlogo} className="img" alt="Logo" />
        </Link>
        <div className="div-0">
          <Link to="/landing" className="no-underline">
            <div className="div-2">
              <div className="div-3">Home</div>
            </div>
          </Link>
          <Link to="/landing#courses" className="no-underline">
            <div className="div-4">
              <div className="div-5">Courses</div>
            </div>
          </Link>
          <Link to="/landing#about-us" className="no-underline">
            <div className="div-6">
              <div className="div-7">About us</div>
            </div>
          </Link>
          <Link to="/signup" className="no-underline">
            <div className="div-8">
              <div className="div-9">Sign up</div>
            </div>
          </Link>
          <Link to="/login" className="no-underline">
            <div className="div-10">
              <div className="div-11">Login</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
