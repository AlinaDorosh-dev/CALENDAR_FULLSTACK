import React, { useEffect, useState } from "react";
// import CalendarGrid from "../components/CalendarGrid";
import Calendar from "../components/calendar/Calendar";
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

  const postEventWithToken = {
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
    try {
      const response = await apiRequest(EVENTS_URL, postEventWithToken);
      const data = await response.json();
      setEvents([...events, data.newEvent]);
    } catch (error) {
      console.log("need to check refresh token")
     }
  };

  return (
    <div>
      <h2>CalendarPage</h2>
      <h3>Here your events</h3>
      <ol>
        {events.map((item) => (
          <li>Title: {item.title}, Date: {item.start.substring(0,10)}</li>
        ))}
      </ol>

      <button onClick={addEvent}>Add events</button>

      {/* <CalendarGrid events = {events}/> */}

<Calendar/>
    </div>
  );
};

export default CalendarPage;
