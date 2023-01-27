import React, { useEffect , useState} from 'react'

const CalendarPage = () => {
const EVENTS_URL = "http://localhost:8001/calendar/events/"
const [events, setEvents] =useState([]) 
const apiGetEvents = async (errMsg = null) => {
  try {
    const response = await fetch(EVENTS_URL, {
      method: "Get",
      headers: {
        "auth-token": localStorage.getItem("token"),
      }      
    });
    if (!response.ok) throw Error("Please reload the app");
    const data = await response.json();
    console.log(data.events);
    setEvents(data.events) ;
  } catch (err) {
    errMsg = err.message;
  }
};

useEffect(() => {
  apiGetEvents()

 }, [])


return (
    <div>
      <h2>CalendarPage</h2>
<h3>Here your events</h3>
<ol>
{events.map((item) =><li>{item.title}</li>)}</ol>
    </div>
  )
}

export default CalendarPage