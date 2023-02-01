import classes from "./CalendarGrid.module.css";
import CalendarCell from "./CalendarCell";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


const CalendarGrid = ({ daysNumber, prefixDays }) => {
  // console.log(prefixDays);
  return (
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
              // onClick={() => handleClickDate(date)
              // }
            >
              {date}
            </CalendarCell>
          );
        })}

        {/* {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell key={index} />
        ))}         */}
      </div>
    </div>
  );
};

export default CalendarGrid;
