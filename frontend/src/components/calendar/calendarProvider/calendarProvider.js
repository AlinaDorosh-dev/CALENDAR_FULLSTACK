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

  useEffect(() => {
    apiGetEvents();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        EVENTS_URL,
        events,
        setEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
