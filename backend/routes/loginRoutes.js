const express = require("express");
const loginRouter = express.Router();
const { register, login, refresh, updateUser } = require("../controllers/loginController");
const { verifyToken } = require("../middleware/tokenMidlware");

loginRouter.route("/signup").post(register);
loginRouter.route("/login").post(login);
loginRouter.route("/refresh").get(verifyToken, refresh);
loginRouter.route("/login/:id").patch(verifyToken, updateUser);

module.exports = loginRouter;
