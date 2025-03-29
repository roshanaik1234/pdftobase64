import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Daily Standup Meeting on HRMS",
      start: new Date(2025, 3, 28, 10, 30), // Mar 13, 10:30 AM
      end: new Date(2025, 3, 28, 11, 59), // 12:00 PM
    },
  ]);

  return (
    <>
    <div style={{ height: 500, padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="day" // Options: month, week, day, agenda
        style={{ height: "100%" }}
      />
    </div>
     <div style={{ height: 500, padding: 20 }}>
     <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: '100%', }}
              view={['month']}

            />
   </div>
   </>
  );
};

export default MyCalendar;
