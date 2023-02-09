import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import classes from "./Calendar.module.css";

const Calendar = () => {
  return (
    <div className={classes["calendar-container"]}>
      <CalendarHeader />
      <CalendarGrid />
    </div>
  );
};

export default Calendar;
