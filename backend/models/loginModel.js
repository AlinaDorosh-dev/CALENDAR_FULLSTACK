const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 60,
    maxlength: 60,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    trim: true,
    default: "user",
  },
  registerAt: {
    type: Date,
    immutable: true,
  },
  lastLogin: {
    type: Date,
  },
});

const login = mongoose.model("Login", loginSchema);

module.exports = login;
