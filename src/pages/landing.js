import React from 'react'
import Navbar from '../components/navbar'
import landingpagebg from "../images/landingpagebg.jpg";
import './landing.css';

function Landing() {
  return (

    <div>
        <Navbar></Navbar>
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
          <div className="joinButton">Join now</div>
        </div>
        <div className="imageContent">
        <img
          loading="lazy"
          src={landingpagebg}
          className="svg-icon"
          alt= "Logo"
        />
        </div>
      </div>
    </div>
  )
}

export default Landing