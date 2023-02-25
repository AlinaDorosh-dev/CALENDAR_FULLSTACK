import classes from "./ModalForm.module.css";
import { CalendarContext } from "../../../providers/calendarProvider";
import apiRequest from "../../../utils/apiRequest";
import { useState, useContext, useEffect, useRef } from "react";
const AddForm = ({ month, year }) => {
  const { EVENTS_URL, events, setEvents, visible, setVisible, date } =
    useContext(CalendarContext);

  const titleRef = useRef(null);

  // if (visible) {
  //   titleRef.current.focus();
  // }
  const [startTime, setStartTime] = useState("09:00");
  const startEvent = new Date(
    `${month}-${new Date(date).getDate()}-${year} ${startTime} UTC`
  ).toISOString();

  useEffect(() => {
    setNewEvent({
      ...newEvent,
      start: startEvent,
    });
  }, [date, startTime]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: startEvent,
    theme: "purple",
  });

  const postEventWithToken = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(newEvent),
  };

  const submitNewEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest(EVENTS_URL, postEventWithToken);
      const data = await response.json();
      setEvents([...events, data.newEvent]);
    } catch (error) {
      console.log(error.message);
      console.log("need to check refresh token");
    }
    setStartTime("09:00");
    setNewEvent({
      title: "",
      start: startEvent,
      theme: "purple",
    });
    setVisible(!visible);
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Add event details</h2>
      <label htmlFor='eventTitle'>
        <h3>Event title:</h3>
      </label>
      <input
        type='text'
        id='eventTitle'
        autoComplete='off'
        value={newEvent.title}
        name='title'
        onChange={handleInputChange}
        placeholder='Event title'
        ref={titleRef}
      />

      <h3>Event date:</h3>
      <div className={classes["event-date"]}>{date}</div>
      <label htmlFor='startTime'>
        <h3>Event time:</h3>
      </label>

      <input
        type='time'
        name='startTime'
        id='startTime'
        min='07:00'
        max='21:00'
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <select
        name='theme'
        id='theme'
        onChange={handleInputChange}
        value={newEvent.theme}
      >
        <option value='blue' className={classes.blue}>
          Blue Theme
        </option>
        <option value='red' className={classes.red}>
          Red Theme
        </option>
        <option value='yellow' className={classes.yellow}>
          Yellow Theme
        </option>
        <option value='green' className={classes.green}>
          Green Theme
        </option>
        <option value='purple' className={classes.purple}>
          Purple Theme
        </option>
      </select>

      <div className={classes.buttons}>
        <button className={classes.cancel} onClick={() => setVisible(!visible)}>
          Cancel
        </button>
        <button
          className={
            newEvent.title && startTime ? classes.save : classes.disabled
          }
          onClick={submitNewEvent}
          disabled={!newEvent.title || !startTime ? true : false}
        >
          Save event
        </button>
      </div>
    </form>
  );
};

export default AddForm;
