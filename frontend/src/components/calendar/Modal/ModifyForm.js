import classes from "./ModalForm.module.css";
import { useState, useContext, useEffect } from "react";
import { CalendarContext } from "../calendarProvider/calendarProvider";
import apiRequest from "../../../utils/apiRequest";

//IsoString returns one hour less. Getting rid of this difference and formatting the date
let formatDate = (date, time) => {
  let x = new Date(`${date} ${time}`).getTimezoneOffset() * 60000;
  let dateIsoString = new Date(new Date(`${date} ${time}`) - x).toISOString();
  return dateIsoString;
};

const ModifyForm = ({}) => {
  const {
    EVENTS_URL,
    events,
    setEvents,
    modifyingEvent,
    setModifyingEvent,
    setVisible,
    setModify,
    visible,
  } = useContext(CalendarContext);

  const [updateEvent, setUpdateEvent] = useState(modifyingEvent);
  //state for set default value in date-picker
  const [modifyDate, setModifyDate] = useState(
    new Date(modifyingEvent.start).toJSON().slice(0, 10)
  );
  //state for set default value in time-picker
  const [modifyTime, setModifyTime] = useState(
    new Date(modifyingEvent.start).toISOString().substr(11, 5)
  );

  useEffect(() => {
    setUpdateEvent({
      ...updateEvent,
      start: formatDate(modifyDate, modifyTime),
    });
  }, [modifyDate, modifyTime]);

  const patchOption = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(updateEvent),
  };
  const deleteOption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  };

  const submitModifiedEvent = async () => {
    try {
      const response = await apiRequest(
        `${EVENTS_URL}${modifyingEvent._id}`,
        patchOption
      );
      const data = await response.json();

      const listEvents = events.map((ev) =>
        ev._id === data.updatedEvent._id ? data.updatedEvent : ev
      );
      setEvents(listEvents);
      setVisible(!visible);
      setModify(false);
      setModifyingEvent({});
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await apiRequest(
        `${EVENTS_URL}${modifyingEvent._id}`,
        deleteOption
      );
      const data = await response.json();
      const listEvents = events.filter((ev) => ev._id !== data.id);
      setEvents(listEvents);
      console.log(data, "data");
      setVisible(!visible);
      setModify(false);
      setModifyingEvent({});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Modify event details</h2>
      <label htmlFor='eventTitle'>
        <h3>Event title</h3>
      </label>

      <input
        type='text'
        id='eventTitle'
        defaultValue={modifyingEvent.title}
        name='title'
        onChange={(e) =>
          setUpdateEvent({ ...updateEvent, title: e.target.value })
        }
      />
      <label htmlFor='eventDate'>
        <h3>Event date</h3>
      </label>

      <input
        id='eventDate'
        type='date'
        name='start'
        onChange={(e) => setModifyDate(e.target.value)}
        value={modifyDate}
      />

      <label htmlFor='eventTime'>
        <h3>Event time</h3>
      </label>
      <input
        type='time'
        name='eventTime'
        id='eventTime'
        value={modifyTime}
        onChange={(e) => setModifyTime(e.target.value)}
      />

      <select
        name='theme'
        id='theme'
        onChange={(e) =>
          setUpdateEvent({ ...updateEvent, theme: e.target.value })
        }
        defaultValue={modifyingEvent.theme}
      >
        <option value='blue'>Blue Theme</option>
        <option value='red'>Red Theme</option>
        <option value='yellow'>Yellow Theme</option>
        <option value='green'>Green Theme</option>
        <option value='purple'>Purple Theme</option>
      </select>

      <div className={classes.buttons}>
        <button className={classes.delete} onClick={handleDeleteEvent}>
          Delete this event
        </button>
        <button className={classes.modify} onClick={submitModifiedEvent}>
          Modify event
        </button>
      </div>
    </form>
  );
};

export default ModifyForm;
