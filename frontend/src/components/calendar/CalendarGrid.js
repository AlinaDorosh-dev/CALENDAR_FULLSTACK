import classes from "./CalendarGrid.module.css";
import CalendarCell from "./CalendarCell";
import { useContext } from "react";
import { CalendarContext } from "../../providers/calendarProvider";
import ReactDOM from "react-dom";
import ModalForm from "./modal/ModalForm";
import CalendarEvent from "./CalendarEvent";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarGrid = () => {
  const {
    events,
    visible,
    setVisible,
    setDate,
    setModify,
    setModifyingEvent,
    daysNumber,
    prefixDays,
    sufixDays,
    month,
    year,
  } = useContext(CalendarContext);

  const handleClickDate = (date) => {
    const clickedDate = new Date(`${month} ${date}, ${year} 09:00 UTC`);
    setVisible(!visible);
    setDate(clickedDate.toDateString());
  };

  const clickEvent = (e, event) => {
    e.stopPropagation();
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
            <div
              key={day}
              style={{ backgroundColor: "#1d7874", color: "antiquewhite" }}
            >
              <h4>{day}</h4>
            </div>
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
            //Filter events for this day and sort them by time
            const thisDayEvents = events
              .filter(
                (event) =>
                  event.start.substr(0, 10) === calendarDay.substr(0, 10)
              )
              .sort((a, b) => {
                if (a.start.substr(11, 2) === b.start.substr(11, 2)) {
                  return a.start.substr(14, 2) - b.start.substr(14, 2);
                }
                return a.start.substr(11, 2) - b.start.substr(11, 2);
              });

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
                      {event.start.substr(11, 5)} {event.title.substr(0, 20)}
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
