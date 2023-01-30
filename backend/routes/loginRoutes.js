const express = require("express");
const loginRouter = express.Router();
const { register, login, refresh } = require("../controllers/loginController");
const { verifyToken } = require("../middleware/tokenMidlware");

loginRouter.route("/signup").post(register);
loginRouter.route("/login").post(login);
loginRouter.route("/refresh").get(verifyToken, refresh);

module.exports = loginRouter;
