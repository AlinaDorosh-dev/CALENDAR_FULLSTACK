import classes from "./ModalForm.module.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CalendarContext } from "../../../providers/calendarProvider";
import ModifyForm from "./ModifyForm";
import AddForm from "./AddForm";
const ModalForm = ({ month, year }) => {
  const { visible, setVisible, modify, setModify, setModifyingEvent } =
    useContext(CalendarContext);

  const handleClose = () => {
    setVisible(!visible);
    setModify(false);
    setModifyingEvent({});
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
            onClick={handleClose}
          />
          {modify ? <ModifyForm /> : <AddForm month={month} year={year} />}
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default ModalForm;
