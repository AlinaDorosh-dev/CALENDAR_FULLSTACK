import classes from "./CalendarCell.module.css";

const CalendarCell = ({ children, onClick, isToday }) => {
  return (
    <div
      className={isToday ? `${classes.today} ${classes.cell}` : classes.cell}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CalendarCell;
