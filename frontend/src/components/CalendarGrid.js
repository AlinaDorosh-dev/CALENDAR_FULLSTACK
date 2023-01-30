import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// const events = [
//     { title: 'Meeting', start: new Date() }
//   ]
  function renderEventContent(eventInfo) {
    console.log(eventInfo.event);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

const CalendarGrid = ({events}) => {
   console.log(events);
  return (
    <div>
        <h1>CalendarGrid</h1>

        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
        </div>
  )
}

export default CalendarGrid