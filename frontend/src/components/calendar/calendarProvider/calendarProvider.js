import { createContext, useEffect, useState } from "react";
import apiRequest from "../../../utils/apiRequest";
export const CalendarContext = createContext(null);

const CalendarProvider = ({ children }) => {
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
  const addEvent = async () => {
    try {
      const response = await apiRequest(EVENTS_URL, postEventWithToken);
      const data = await response.json();
      setEvents([...events, data.newEvent]);
    } catch (error) {
      console.log("need to check refresh token")
     }
  };

  useEffect(() => {
    apiGetEvents();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        EVENTS_URL,
        postEventWithToken,
        events,
        setEvents,
        addEvent
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
