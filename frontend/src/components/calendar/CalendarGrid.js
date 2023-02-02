import classes from "./CalendarGrid.module.css";
import CalendarCell from "./CalendarCell";
import { useState } from "react";
import ReactDOM from "react-dom";
import ModalForm from "./Modal/ModalForm";
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarGrid = ({ daysNumber, prefixDays, sufixDays, month, year }) => {
  // console.log(prefixDays);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);
  const handleClickDate = (date) => {
    const clickedDate = new Date(`${month} ${date}, ${year}`).toISOString();
    console.log(`You clicked ${clickedDate}`);
    setVisible(!visible);
    setDate(clickedDate);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <ModalForm visible={visible} 
         setVisible={setVisible} 
          date={date} />,
        document.querySelector("#modal")
      )}

      <div className={classes["calendar-container"]}>
        <div className={classes.calendar}>
          {weekdays.map((day) => (
            <CalendarCell key={day}>{day}</CalendarCell>
          ))}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <CalendarCell key={index} />
          ))}

          {Array.from({ length: daysNumber }).map((_, index) => {
            const date = index + 1;
            // const isCurrentDate = date === value.getDate();

            return (
              <CalendarCell
                key={date}
                // isActive={isCurrentDate}
                onClick={() => handleClickDate(date)}
              >
                {date}
              </CalendarCell>
            );
          })}
          {Array.from({ length: sufixDays }).map((_, index) => (
            <CalendarCell key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarGrid;
