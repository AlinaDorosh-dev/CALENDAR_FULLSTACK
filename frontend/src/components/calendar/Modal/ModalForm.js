import { useState, useContext, useEffect } from "react";
import classes from "./ModalForm.module.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarContext } from "../calendarProvider/calendarProvider";
import apiRequest from "../../../utils/apiRequest";
const ModalForm = ({ visible, setVisible, date, month, year }) => {
  const { EVENTS_URL, events, setEvents } = useContext(CalendarContext);
  const [eventDate, setEventDate] = useState(date);

  useEffect(() => {
    setNewEvent({
      ...newEvent,
      start: new Date(
        `${month}-${new Date(date).getDate()}-${year} 09:00 UTC`
      ).toISOString(),
      end: new Date(
        `${month}-${new Date(date).getDate()}-${year} 10:00 UTC`
      ).toISOString(),
    });
  }, [date]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    theme: "blue",
  });

  const postEventWithToken = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(newEvent),
  };

  const submitEvent = async (e) => {
    e.preventDefault();
    console.log(newEvent);
    try {
      const response = await apiRequest(EVENTS_URL, postEventWithToken);
      const data = await response.json();
      setEvents([...events, data.newEvent]);
    } catch (error) {
      console.log("need to check refresh token");
    }
    setNewEvent({ title: "", start: "", end: "", theme: "" });
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
    <>
      <div
        className={`${classes["md-modal"]} 
        ${classes["md-effect-1"]} ${visible && classes["md-show"]}`}
      >
        <div className={classes["md-content"]}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            role='button'
            onClick={() => setVisible(!visible)}
          />
          <form onSubmit={submitEvent}>
            <h2>Add event details</h2>
            <label htmlFor='eventTitle'>
              <h3>Event title</h3>
            </label>
            <input
              type='text'
              id='eventTitle'
              autoComplete='off'
              value={newEvent.title}
              name='title'
              onChange={handleInputChange}
              placeholder='Event title'
            />
            {/* <label htmlFor='eventDate'>
              <h3>Event date</h3>
            </label>
            <input
              type='text'
              id='eventDate'
              value={date}
              // value={newEvent.start}
              name='start'
              onChange={handleInputChange}
            /> */}
            <h3>Event date</h3>
            <div className={classes["event-date"]}>{date}</div>
            <select name='theme' id='theme' onChange={handleInputChange}>
              <option value='blue'>Blue Theme</option>
              <option value='red'>Red Theme</option>
              <option value='yellow'>Yellow Theme</option>
              <option value='green'>Green Theme</option>
              <option value='purple'>Purple Theme</option>
            </select>
            <div className={classes.buttons}>
              {" "}
              <button
                className={classes.cancel}
                onClick={() => setVisible(!visible)}
              >
                Cancel
              </button>
              <button
                className={classes.save}
                type='submit'
                disabled={!newEvent.title ? true : false}
              >
                Save event
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ModalForm;
