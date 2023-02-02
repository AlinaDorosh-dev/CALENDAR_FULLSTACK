import React, { useEffect, useState, useContext } from "react";
import Calendar from "../components/calendar/Calendar";
import { CalendarContext } from "../components/calendar/calendarProvider/calendarProvider";
const CalendarPage = () => {
  const { events, addEvent } = useContext(CalendarContext);
    return (
    <div>
      <h2>CalendarPage</h2>
      <h3>Here your events</h3>
      <ol>
        {events.map((item) => (
          <li>
            Title: {item.title}, Date: {item.start.substring(0, 10)}
          </li>
        ))}
      </ol>

      <button onClick={addEvent}>Add events</button>

      <Calendar />
    </div>
  );
};

export default CalendarPage;
