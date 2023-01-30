import React, { useEffect, useState } from "react";
// import CalendarGrid from "../components/CalendarGrid";
import apiRequest from "../utils/apiRequest";
const CalendarPage = () => {
  const EVENTS_URL = "http://localhost:8001/calendar/events/";
  const [events, setEvents] = useState([]);

  const getEventsOption = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("token"),
    },
  };

  const apiGetEvents = async () => {
    const response = await apiRequest(EVENTS_URL, getEventsOption);
    const data = await response.json();
    setEvents(data.events);
  };

  let eventTitle = "Title of new event 123";

  const postEventOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      title: eventTitle,
    }),
  };

  useEffect(() => {
    apiGetEvents();
  }, []);

  const addEvent = async () => {
    const response = await apiRequest(EVENTS_URL, postEventOption);
    const data = await response.json();
    setEvents([...events, data.newEvent]);
  };


  return (
    <div>
      <h2>CalendarPage</h2>
      <h3>Here your events</h3>
      <ol>
        {events.map((item) => (
          <li>{item.title}</li>
        ))}
      </ol>

      <button onClick={addEvent}>Add events</button>

      {/* <CalendarGrid events = {events}/> */}
    </div>
  );
};

export default CalendarPage;
