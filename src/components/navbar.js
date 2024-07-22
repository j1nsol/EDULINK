import * as React from "react";
import { Link } from "react-router-dom";
import navbarlogo from "../images/navbarlogo.png";
import './navbar.css';

function Navbar() {
  return (
    <div className="top-bar">
      <div className="div">
        <img
          loading="lazy"
          src={navbarlogo}
          className="img"
          alt="Logo"
        />
        <div className="div-2">
          <div className="div-3">
            <Link to="/" className="no-underline">Home</Link>
          </div>
          <div className="div-4">
            <div className="div-5">Courses</div>
          </div>
          <div className="div-6">
            <Link to="/about-us" className="no-underline"></Link>
            <div className="div-7">About us</div>
          </div>
          <div className="div-8">
            <div className="div-9">Sign up</div>
          </div>
          <div className="div-10">
            <Link to="/login" className="no-underline">
              <div className="div-11">Login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
