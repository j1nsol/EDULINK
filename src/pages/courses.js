import React, { useEffect } from 'react';
import './courses.css';
import BSCE from '../images/BSCE.png';
import BSCPE from '../images/BSCPE.png';
import BSPHARMA from '../images/BSPHARMA.png';
import tbd from '../images/tbd.png';

function Courses() {
    useEffect(() => {
        const track = document.getElementById("image-track");

        if (!track) return;

        const handleMouseDown = e => {
            track.dataset.mouseDownAt = e.clientX;
            track.dataset.prevPercentage = track.dataset.percentage || "0";
        };

        const handleMouseMove = e => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
            const maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100;
            const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

            track.dataset.percentage = Math.min(Math.max(nextPercentage, -100), 0);

            track.style.transform = `translate(${track.dataset.percentage}%, -50%)`;
        };

        const handleMouseUp = () => {
            track.dataset.mouseDownAt = "0";
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <body>
<div className='course-container'>
            <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                <img className="image" src={tbd} alt="tbd" draggable="false" />
                <img className="image" src={BSCE} alt="BSCE" draggable="false" />
                <img className="image" src={BSCPE} alt="BSCPE" draggable="false" />
                <img className="image" src={BSPHARMA} alt="BSPHARMA" draggable="false" />
                <img className="image" src={tbd} alt="tbd" draggable="false" />
                <img className="image" src={tbd} alt="tbd" draggable="false" />
            </div>
        </div>
        </body>
        
    );
}

export default Courses;
