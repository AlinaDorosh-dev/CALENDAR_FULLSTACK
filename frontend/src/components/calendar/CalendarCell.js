import classes from './CalendarCell.module.css'

const CalendarCell = ({children, onClick}) => {
  return (
    <div className={classes.cell} onClick ={onClick}>
        {children}
    </div>
  )
}

export default CalendarCell