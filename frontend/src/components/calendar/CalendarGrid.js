import classes from "./CalendarGrid.module.css";
import CalendarCell from "./CalendarCell";
import { useState, useContext } from "react";
import { CalendarContext } from "./calendarProvider/calendarProvider";
import ReactDOM from "react-dom";
import ModalForm from "./Modal/ModalForm";
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarGrid = ({ daysNumber, prefixDays, sufixDays, month, year }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date().toDateString());

  const handleClickDate = (date) => {
    const clickedDate = new Date(`${month} ${date}, ${year} 09:00 UTC`);
    setVisible(!visible);
    setDate(clickedDate.toDateString());
  };

  const { events } = useContext(CalendarContext);
  console.log(events);
  return (
    <>
      {ReactDOM.createPortal(
        <ModalForm
          visible={visible}
          setVisible={setVisible}
          date={date}
          month={month}
          year={year}
        />,
        document.querySelector("#modal")
      )}

      <div className={classes["calendar-container"]}>
        <div className={classes.calendar}>
          {/* Map days names */}

          {weekdays.map((day) => (
            <CalendarCell key={day}>
             <h4>{day}</h4> 
              </CalendarCell>
          ))}

          {/* map empty cellls if month does not start on sunday */}

          {Array.from({ length: prefixDays }).map((_, index) => (
            <CalendarCell key={index} />
          ))}

          {/* map calentar days */}

          {Array.from({ length: daysNumber }).map((_, index) => {
            const mapedDay = index + 1;
            const calendarDay = new Date(
              `${month} ${mapedDay}, ${year} 09:00 UTC`
            ).toISOString();

            const currentDate = new Date(`${new Date().getMonth() + 1}
             ${new Date().getDate()} ${new Date().getFullYear()} 09:00 UTC`).toISOString();

            const isToday = calendarDay === currentDate;

            const hasEvent = events.find(
              (event) => event.start === calendarDay
            );
            if (hasEvent) {
              console.log(hasEvent.title);
            }

            return (
              <CalendarCell
                key={mapedDay}
                isToday={isToday}
                onClick={() => handleClickDate(mapedDay)}
                calendarDay={calendarDay}
                events={events}
                mapedDay={mapedDay}
              >
                {mapedDay}
                {hasEvent && <p>{hasEvent.title}</p>}
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
