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
  Number(currentYear),
  months.indexOf(currentMonth) + 1,
  0
).getDate();

const startDay = new Date(`${currentMonth} 1, ${currentYear}`).getDay();
const endDay = new Date(`${currentMonth} ${numberOfDays}, ${currentYear}`).getDay();

const Calendar = () => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [daysNumber, setDaysNumber] = useState(numberOfDays);
  const [prefixDays, setPrefixDays] = useState(startDay);
  const [sufixDays, setSufixDays] = useState(6 - endDay);

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
        setSufixDays ={setSufixDays}
        daysNumber={daysNumber}
      />
      <CalendarGrid
        daysNumber={daysNumber}
        prefixDays={prefixDays}
        sufixDays={sufixDays}
        month={month}
        year={year}
      />
    </>
  );
};

export default Calendar;
