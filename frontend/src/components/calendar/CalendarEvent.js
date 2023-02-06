import classes from "./CalendarEvent.module.css";

const CalendarEvent = ({ children, clickEvent, color }) => {
  return (
    <div
      onClick={clickEvent}
      className={`${classes.event} ${classes[`${color}`]}`}
    >
      {children}
    </div>
  );
};

export default CalendarEvent;
