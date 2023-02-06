import { createContext, useEffect, useState } from "react";
import apiRequest from "../../../utils/apiRequest";
export const CalendarContext = createContext(null);

const CalendarProvider = ({ children }) => {
  const EVENTS_URL = "http://localhost:8001/calendar/events/";
  //state for initial fetch
  const [events, setEvents] = useState([]);
  //state for open and close modal window
  const [visible, setVisible] = useState(false);

  //date state for modal window
  const [date, setDate] = useState(new Date().toDateString());
  //states for rendering modify event form
  const [modify, setModify] = useState(false);
  const [modifyingEvent, setModifyingEvent] = useState({});

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
        visible,
        setVisible,
        date,
        setDate,
        modify,
        setModify,
        modifyingEvent,
        setModifyingEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
