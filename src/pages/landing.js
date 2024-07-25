import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from '../components/navbar';
import landingpagebg from "../images/landingpagebg.jpg";
import Courses from './courses';
import './landing.css';
import marbench from "../images/marbench (1).jpg";
import flex from "../images/flex.jpg";
import dpsample from "../images/dpsample.png";
import jim from "../images/jim.png";

const developers = [
  { name: 'Carry Ana', imgSrc: dpsample, description: 'ako ang lider sa mga wakwak ,wa koy tog di sa sig code pero tungod sa ako alter ego nga si god Anna' },
  { name: 'Support is layp', imgSrc: flex, description: 'batos batos sa lider sa wak2, wa koy tog pero wa pd ko gacode, moral support lng jd ko aring dapita' },
  { name: 'idol nakos Ana', imgSrc: marbench, description: 'idol nako si ana mao ng akong programming langguage gigamit kay bisaya developed by jimmy neutron' },
  { name: 'pos 1 ng naspi pero pos3 sa ko ron', imgSrc: jim, description: 'akoy bahala sa muunag lihok ug himo pero sila nay mutiwas, kay matod pa sa hulagway "the early bird wakes up early"-support is layp' }
];

function Landing() {

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  
  return (
    <div>
      <Navbar />
      <div id="home" className="container">
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
      <div id="courses" className="section">
        <div className="section-header-box">
          <h2 className="section-header">Courses</h2>
        </div>
        <Courses />
      </div>
      <div id="about-us" className="about-us-wrapper">
        <div className="section-header-box">
          <h2 className="section-header">About Us</h2>
        </div>
        <div className="about-us-container">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <div className="developer-image-container">
                <img src={dev.imgSrc} alt={`${dev.name}'s profile`} />
                <h3 className="developer-name">{dev.name}</h3>
              </div>
              <div className="developer-description-container">
                <p className="developer-description">{dev.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
