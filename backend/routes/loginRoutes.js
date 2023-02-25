const express = require("express");
const loginRouter = express.Router();
const { register, login, refresh, updateUser, deleteUser } = require("../controllers/loginController");
const { verifyToken } = require("../middleware/tokenMidlware");

loginRouter.route("/signup").post(register);
loginRouter.route("/login").post(login);
loginRouter.route("/refresh").get(verifyToken, refresh);
loginRouter.route("/login/:id").patch(verifyToken, updateUser);
loginRouter.route("/login/:id").delete(verifyToken, deleteUser);

module.exports = loginRouter;
