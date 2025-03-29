import React, { useState } from "react";
import { format } from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample meeting data (can be fetched from an API)
  const meetings = [
    { startTime: "10:00 AM", endTime: "12:00 AM", title: "Daily standup Meeting on HRMS" },
  ];

  // Generate time slots (Every Hour)
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 8 + i; // Start at 08:00 AM
    return format(new Date(2024, 2, 13, hour), "hh:00 a");
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-100 p-3 rounded-t-lg">
        <h3 className="text-blue-800 font-semibold">Calendar</h3>
        <span className="text-blue-800 font-semibold">{format(selectedDate, "EEE, MMM dd")}</span>
      </div>

      {/* Time Slots */}
      <div className="p-2">
        {timeSlots.map((time, index) => {
          const meeting = meetings.find((m) => m.startTime === time);
          return meeting ? (
            <div key={index} className="relative my-2 p-2 bg-green-400 text-white rounded-md">
              <p className="text-sm font-semibold">{meeting.startTime} {meeting.title} {meeting.endTime}</p>
              {/* <p className="text-xs">{meeting.title}</p> */}
            </div>
          ) : (
            <p key={index} className="text-gray-500 text-sm">{time}</p>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
