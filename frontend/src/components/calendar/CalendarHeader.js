import classes from "./CalendarHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";
import { CalendarContext } from "../../providers/calendarProvider";

const CalendarHeader = () => {

  const {
    month,
    setMonth,
    year,
    setYear,
    months,
    years,
    setDaysNumber,
    setPrefixDays,
    setSufixDays,
    daysNumber
  } = useContext(CalendarContext);

  useEffect(() => {
    setPrefixDays(new Date(`${month} 1, ${year}`).getDay());
    setSufixDays(6 - new Date(`${month} ${daysNumber}, ${year}`).getDay());
    setDaysNumber(
      new Date(Number(year), months.indexOf(month) + 1, 0).getDate()
    );
  }, [month, year, daysNumber]);

  const prevMonth = () => {
    if (months.indexOf(month) === 0) {
      setMonth(months[11]);
      setYear(years[years.indexOf(year) - 1]);
    } else {
      setMonth(months[months.indexOf(month) - 1]);
    }
  };

  const nextMonth = () => {
    if (months.indexOf(month) === 11) {
      setMonth(months[0]);
      setYear(years[years.indexOf(year) + 1]);
    } else {
      setMonth(months[months.indexOf(month) + 1]);
    }
  };

  return (
    <div className={classes.header}>
      <div>
        {month} {year}
      </div>

      <div className={classes.btn}>
        <button
          disabled={month === "January" && year === "2023" ? true : false}
          onClick={() => prevMonth()}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          disabled={month === "December" && year === "2030" ? true : false}
          onClick={() => nextMonth()}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
