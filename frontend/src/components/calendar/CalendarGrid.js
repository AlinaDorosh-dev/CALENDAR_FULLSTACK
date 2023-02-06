import classes from "./CalendarGrid.module.css";
import CalendarCell from "./CalendarCell";
import { useContext } from "react";
import { CalendarContext } from "./calendarProvider/calendarProvider";
import ReactDOM from "react-dom";
import ModalForm from "./Modal/ModalForm";
import CalendarEvent from "./CalendarEvent";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarGrid = ({ daysNumber, prefixDays, sufixDays, month, year }) => {
  const {
    events,
    visible,
    setVisible,
    setDate,
    setModify,
    setModifyingEvent,
  } = useContext(CalendarContext);

  const handleClickDate = (date) => {
    const clickedDate = new Date(`${month} ${date}, ${year} 09:00 UTC`);
    setVisible(!visible);
    setDate(clickedDate.toDateString());
  };

  const clickEvent = (e, event) => {
    e.stopPropagation();
    console.log("event clicked", event);
    setModifyingEvent(event);
    setModify(true);
    setVisible(!visible);
  };
  return (
    <>
      {ReactDOM.createPortal(
        <ModalForm month={month} year={year} />,
        document.querySelector("#modal")
      )}

      <div className={classes["calendar-container"]}>
        <div className={classes.calendar}>
          {/* Map days names */}

          {weekdays.map((day) => (
            <CalendarCell key={day} className={classes.weekdays}>
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

            const thisDayEvents = events.filter(
              (event) => event.start.substr(0, 10) === calendarDay.substr(0, 10)
            );

            return (
              <CalendarCell
                key={mapedDay}
                isToday={isToday}
                onClick={() => handleClickDate(mapedDay)}
              >
                {mapedDay}
                {thisDayEvents.length > 0 &&
                  thisDayEvents.map((event) => (
                    <CalendarEvent
                      key={event._id}
                      clickEvent={(e) => clickEvent(e, event)}
                      color={event.theme}
                    >
                      {/* if title lenth is larger then 20, show only first part of title */}
                      {event.title.substr(0, 20)}

                      {event.title.length > 20 && <>...</>}
                    </CalendarEvent>
                  ))}
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
