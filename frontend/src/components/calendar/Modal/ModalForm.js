import classes from "./ModalForm.module.css";

const ModalForm = ({ visible, setVisible, date }) => {
  console.log(` You are in the modal of ${date}`);
  //Must be async
  const submitEvent = (e) => {
    e.preventDefault();
  };
  const newEvent={

  }
  return (
    <>
      <div
        className={`${classes["md-modal"]} 
        ${classes["md-effect-1"]} ${visible && classes["md-show"]}`}
      >
        <div className={classes["md-content"]}>
          <p>You are in the modal of {date}</p>
          <form onSubmit={submitEvent}>
            <h2>Add event details</h2>
            <label htmlFor='eventTitle'>
              <h5>Event title</h5>
            </label>
            <input
             type='text'
             id='eventTitle'
             autoComplete='off' 
             value={newEvent.title}/>
          </form>
        </div>

        <button
          onClick={() => setVisible(!visible)}
          className={classes["md-close"]}
        >
          Close me!
        </button>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ModalForm;
