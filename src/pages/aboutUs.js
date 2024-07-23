import React from 'react';
import Navbar from '../components/navbar';
import './aboutUs.css';
import marbench from "../images/marbench (1).jpg";
import flex from "../images/flex.jpg";
import dpsample from "../images/dpsample.png";
import tbd from "../images/tbd.png";

const developers = [
  { name: 'Carry Ana', imgSrc: dpsample, description: 'ako ang lider sa mga wakwak ,wa koy tog di sa sig code pero tungod sa ako alter ego nga si god Anna' },
  { name: 'Support is layp', imgSrc: flex, description: 'batos batos sa lider sa wak2, wa koy tog pero wa pd ko gacode, moral support lng jd ko aring dapita' },
  { name: 'idol nakos Ana', imgSrc: marbench, description: 'idol nako si ana mao ng akong programming langguage gigamit kay bisaya developed by jimmy neutron' },
  { name: 'pos 1 ng naspi pero pos3 sa ko ron', imgSrc: tbd, description: 'akoy bahala sa muunag lihok ug himo pero sila nay mutiwas, kay matod pa sa hulagway "the early bird wakes up early"-support is layp' }
];

function AboutUs() {
    return (
      <div>
        <Navbar />
        <div className="about-us-wrapper">
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

export default AboutUs;
