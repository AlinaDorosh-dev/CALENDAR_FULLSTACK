const express = require("express");
const { verifyToken } = require("../middleware/tokenMidlware");
const router = express.Router();
const asyncHandler = require("express-async-handler");
//importamos modelo con schema correspondiente
const Event = require("../models/eventModel");

// router.get("/events", async (req, res) => {
//res.send(`get document id ${req.params.id}`);

//The exec() method executes a search for a match in a specified string and returns a result array, or null
//   try {
//    await  Model.find({"user": "63d0dee3bed5ce7c993b5ecf"})
//       .exec()
//       .then((data) =>
//         res.status(200).json({ status: "succeeded", data, error: null })
//       );
//       console.log(req.params)
//       console.log(id);
//   } catch (error) {
//     res.status(404).json({
//       status: "failed",
//       data: null,
//       error: error.message,
//     });
//   }
// try {
//     const events = await Model.find().populate("user", "name")
//     return res.json({
//       ok: true,
//       events
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       msg: "Please, contact the administrator",
//     });
//   }
// });

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id });
  console.log(req.user.id);
  res.status(200).json({ status: "succeeded", events, error: null });
});

const setEvent = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a text to your event");
  }
  const newEvent = await Event.create({
    title: req.body.title,
    start: new Date(),
    end: new Date(),
    allDay: req.body.allday,
    user: req.user.id,
  });

  res.status(200).json({ status: "succeeded", newEvent, error: null });
});
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ status: "succeeded", updatedEvent, error: null });
});
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await event.remove();

  res
    .status(200)
    .json({ status: "successfully deleted", id: req.params.id, error: null });
});

module.exports = { getEvents, setEvent, updateEvent, deleteEvent };
