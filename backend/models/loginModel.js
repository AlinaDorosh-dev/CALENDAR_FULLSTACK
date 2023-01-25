const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const loginSchema = new Schema({
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
    min: "2025-01-01",
    max: "2030-12-31",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    min: this.registerAt
  },
});

const login = mongoose.model("Login", loginSchema);

module.exports = login;
