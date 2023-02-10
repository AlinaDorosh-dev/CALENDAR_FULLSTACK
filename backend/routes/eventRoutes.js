const express = require("express");
const router = express.Router();
const {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { verifyToken } = require("../middleware/tokenMidlware");

router.route("/events").get(verifyToken,getEvents).post(verifyToken,setEvent);
router.route("/events/:id").delete(verifyToken,deleteEvent).patch(verifyToken, updateEvent);


module.exports = router