import React from 'react';
import Navbar from '../components/navbar';
import landingpagebg from "../images/landingpagebg.jpg";
import './landing.css';
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="textContent">
          <div className="title">
            <br />
            InnovateX <br />
            Academy
            <br />
          </div>
          <div className="description">
            At InnovateX, we prioritize hands-on learning experiences, innovative curriculum, and personalized instruction to ensure our students excel in the dynamic world of makeup artistry. Our courses cover a wide range of skills, from basic makeup application to advanced special effects, catering to beginners and experienced artists alike.
          </div>
          <Link to="/signup" className="no-underline">
            <button className="joinButton">Join now</button>
          </Link>
        </div>
        <div className="imageContent">
          <img
            loading="lazy"
            src={landingpagebg}
            className="svg-icon"
            alt="Landing page background"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
