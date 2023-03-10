import { createContext, useEffect, useState } from "react";
import { APIRequest } from "../utils/apiRequest";
export const CalendarContext = createContext(null);

const CalendarProvider = ({ children }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //variables for initial state asignment
  const years = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const currentDate = new Date();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = months[currentDate.getMonth()];
  const numberOfDays = new Date(
    Number(currentYear),
    months.indexOf(currentMonth) + 1,
    0
  ).getDate();

  const startDay = new Date(`${currentMonth} 1, ${currentYear}`).getDay();
  const endDay = new Date(
    `${currentMonth} ${numberOfDays}, ${currentYear}`
  ).getDay();

  //states for dates management
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  // states for mapping calendar grid
  const [daysNumber, setDaysNumber] = useState(numberOfDays);
  const [prefixDays, setPrefixDays] = useState(startDay);
  const [sufixDays, setSufixDays] = useState(6 - endDay);

  //state for initial fetch
  const [events, setEvents] = useState([]);

  //state for open and close modal window
  const [visible, setVisible] = useState(false);

  //date state for modal window
  const [date, setDate] = useState(new Date().toDateString());
  //states for rendering modify event form
  const [modify, setModify] = useState(false);
  const [modifyingEvent, setModifyingEvent] = useState({});


  useEffect(() => {
    const apiGetEvents = async () => {
      try {
        const response = await APIRequest.getEventsByUser();
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.log(error.message);
      }
    };
    apiGetEvents();
  }, []);

  return (
    <CalendarContext.Provider
      value={{
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
        month,
        setMonth,
        year,
        setYear,
        daysNumber,
        setDaysNumber,
        prefixDays,
        setPrefixDays,
        sufixDays,
        setSufixDays,
        years,
        months,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
