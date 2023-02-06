import classes from "./ModalForm.module.css";
import { useState, useContext } from "react";
import { CalendarContext } from "../calendarProvider/calendarProvider";
import apiRequest from "../../../utils/apiRequest";
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
  
  const modifyDate = new Date(modifyingEvent.start).toDateString();
  const [updateEvent, setUpdateEvent] = useState(modifyingEvent);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setUpdateEvent({
      ...updateEvent,
      [name]: value,
    });
  };
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
        defaultValue={modifyingEvent.title}
        name='title'
        onChange={handleInputChange}
      />

      <h3>Event date</h3>

      <input
        type='text'
        defaultValue={modifyDate}
        name='start'
        onChange={(e) =>
          setUpdateEvent({
            ...updateEvent,
            start: new Date(`${e.target.value} 09:00 UTC`).toISOString(),
            end: new Date(`${e.target.value} 10:00 UTC`).toISOString(),
          })
        }
      />
      <select
        name='theme'
        id='theme'
        onChange={handleInputChange}
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
