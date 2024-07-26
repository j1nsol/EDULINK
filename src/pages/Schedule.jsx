import React from 'react';
import './schedule.css';
import Sidebar from '../components/sidebar';

const generateTimeSlots = () => {
  const timeSlots = [];
  const startTime = 7; 
  const endTime = 22; 

  for (let hour = startTime; hour <= endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${(hour % 12 || 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
      timeSlots.push(time);
    }
  }
  return timeSlots;
};

const DaySchedule = ({ day, timeSlots }) => (
  <div className="days-container">
    <div className="day-schedule">
      <div className="day-header" style={{ width: '108px', border: '1px solid black', textAlign: 'center' }}>{day}</div>
      <div className="time-slots">
        {timeSlots.map((time, index) => (
          <div
            className="time-slot"
            key={index}
            style={{
              height: '28px',
              border: '1px solid black',
              width: '108px',
            }}
          >
            {/* Customize each time slot here */}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Schedule = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = generateTimeSlots();

  return (
    <div>
      <Sidebar/>
    <div className="schedule-container">
      <div className="time-column">
        <div style={{ height: '18px', border: '1px solid black' }}></div>
        {timeSlots.map((time, index) => (
          <div
            className="time-label"
            style={{ height: '58px', lineHeight: '60px', border: '1px solid black', paddingLeft: "2px", paddingRight:"2px"}} 
            key={index}
          >
            {time}
          </div>
        ))}
      </div>
      {daysOfWeek.map((day, index) => (
        <DaySchedule key={index} day={day} timeSlots={timeSlots} />
      ))}
    </div>
    </div>
  );
};

export default Schedule;
