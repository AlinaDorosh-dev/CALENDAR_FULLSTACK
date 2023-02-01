import classes from "./CalendarHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


const CalendarHeader = ({
  month,
  setMonth,
  year,
  setYear,
  months,
  years,
  setDaysNumber,
  setPrefixDays,
}) => {
  const prevMonth = () => {
    if (months.indexOf(month) === 0) {
      setMonth(months[11]);
      setYear(years[years.indexOf(year) - 1]);
    } else {
      setMonth(months[months.indexOf(month) - 1]);
    }
    setDaysNumber(new Date(Number(year), months.indexOf(month), 0).getDate());
    //setPrefixDays(new Date(Number(year), months.indexOf(month)).getDay());
    // console.log(new Date(`${month} 1, ${year}`).getDay())
   
  };

  const nextMonth = () => {
    if (months.indexOf(month) === 11) {
      setMonth(months[0]);
      setYear(years[years.indexOf(year) + 1]);
    } else {
      setMonth(months[months.indexOf(month) + 1]);
    }
    setDaysNumber(new Date(Number(year), months.indexOf(month), 0).getDate());
    // setPrefixDays(new Date(Number(year), months.indexOf(month), 1).getDay()-1)
  };

  return (
    <div className={classes.header}>
      <div>
        {month} {year}
      </div>

      <div className={classes.btn}>
        <button
          disabled={month === "January" && year === "2022" ? true : false}
          onClick={() => prevMonth()}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          disabled={month === "December" && year === "2024" ? true : false}
          onClick={() => nextMonth()}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
