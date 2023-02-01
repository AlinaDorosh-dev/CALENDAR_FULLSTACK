import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { useState } from "react";
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

const years = ["2022", "2023", "2024"];
const currentDate = new Date();
const currentYear = new Date().getFullYear().toString();
const currentMonth = months[currentDate.getMonth()];
const numberOfDays = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();

const startDay = new Date().getDay();

const Calendar = () => {
  // console.log(startDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [daysNumber, setDaysNumber] = useState(numberOfDays);
  const [prefixDays, setPrefixDays] = useState(startDay);
  const [sufixDays, setSufixDays] = useState();

  return (
    <>
      <CalendarHeader
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        years={years}
        months={months}
        setDaysNumber={setDaysNumber}
        prefixDays={prefixDays}
        setPrefixDays={setPrefixDays}
      />
      <CalendarGrid daysNumber={daysNumber} prefixDays={prefixDays}/>
    </>
  );
};

export default Calendar;
