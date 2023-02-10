const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
//importamos modelo con schema correspondiente
const Event = require("../models/eventModel");

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
  const { title, start, theme } = req.body;
  const newEvent = await Event.create({
    title,
    start,
    user: req.user.id,
    theme,
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
