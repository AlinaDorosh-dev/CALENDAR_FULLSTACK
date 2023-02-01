import classes from './CalendarCell.module.css'

const CalendarCell = ({children}) => {
  return (
    <div className={classes.cell}>
        {children}
    </div>
  )
}

export default CalendarCell