const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Login",
  },
  theme: { type: String, default: "blue" },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
