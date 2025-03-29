import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // Initialize with multiple events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Daily Standup Meeting on HRMS",
      start: new Date(2025, 2, 28, 10, 30), // Mar 28, 10:30 AM
      end: new Date(2025, 2, 28, 11, 59), // 11:59 AM
    },
    {
      id: 2,
      title: "Project Planning",
      start: new Date(2025, 2, 29, 13, 30), // Mar 29, 1:00 PM
      end: new Date(2025, 2, 29, 15, 0), // 3:00 PM
    },
    {
      id: 3,
      title: "Client Meeting",
      start: new Date(2025, 2, 31, 9, 0), // Mar 31, 9:00 AM
      end: new Date(2025, 2, 31, 10, 30), // 10:30 AM
    },
    {
      id: 4,
      title: "Team Lunch",
      start: new Date(2025, 3, 2, 12, 0), // Apr 2, 12:00 PM
      end: new Date(2025, 3, 2, 13, 30), // 1:30 PM
    }
  ]);

  // Function to add a new event
//   const addEvent = (newEvent) => {
//     setEvents([...events, { id: events.length + 1, ...newEvent }]);
//   };

  // Example of how you might add an event from a form submission
//   const handleAddEvent = () => {
//     const newEvent = {
//       title: "New Meeting",
//       start: new Date(2025, 2, 30, 14, 0), // Mar 30, 2:00 PM
//       end: new Date(2025, 2, 30, 15, 30), // 3:30 PM
//     };
//     addEvent(newEvent);
//   };

  return (
    <>
      <div style={{ height: 500, padding: 20 }}>
        <h2>Day View</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="day"
          style={{ height: "100%" }}
        />
      </div>
      <div style={{ height: 500, padding: 20 }}>
        <h2>Month View</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: '100%' }}
          defaultView="month"
        />
      </div>
      {/* <div style={{ padding: 20 }}>
        <button 
          onClick={handleAddEvent}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Sample Event
        </button>
      </div> */}
    </>
  );
};

export default MyCalendar;