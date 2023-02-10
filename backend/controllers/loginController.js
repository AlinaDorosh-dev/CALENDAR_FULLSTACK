const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginModel = require("../models/loginModel");
const { generateToken } = require("../middleware/tokenMidlware");

const register = async (req, res) => {
  try {
    const data = new LoginModel({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
      name: req.body.name,
      registerAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
    data
      .save()
      .then((data) =>
        res.status(201).json({
          status: "succeeded",
          data,
          error: null,
        })
      )
      .catch((error) => {
        if (error.code == 11000) {
          console.log("Clave duplicada");
          return res.status(409).json({
            status: "failed",
            data: null,
            error:
              "You are trying to register an existent email. Please choose a new email and try again.",
          });
        }
        return res
          .status(400)
          .json({ status: "failed", data: null, error: error.message });
      });
  } catch (error) {
    if (error.message == "data and salt arguments required") {
      res.status(422).json({
        status: "failed",
        data: null,
        error:
          "Password is required, please insert a valid password and try again",
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const data = await LoginModel.findOne({ email: req.body.email }).exec();
    if (data) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (validPassword) {
        // generar un token
        const user = {
          id: data._id,
          email: data.email,
          role: data.role,
        };
        const token = generateToken(user, false);
        const refreshToken = generateToken(user, true);
       
        await data.save();
        res.status(200).json({
          status: "succeeded",
          data: {
            id: data._id,
            email: data.email,
            role: data.role,
            token,
            refreshToken,
            lastLogin: data.lastLogin,
          },
          error: null,
        });
              } else {
        res.status(401).json({
          status: "failed",
          data: null,
          error: "Wrong email or password",
        });
      }
    } else {
      res.status(401).json({
        status: "failed",
        data: null,
        error: "Wrong email or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const refresh = (req, res) => {
  if (!req.user) {
    return res.status(400).send("Access denied");
  }
  const { _id, email, role, exp } = req.user;
  res.status(200).json({
    status: "Succeeded",
    data: {
      token: generateToken({ _id, email, role }, false),
      refreshToken: generateToken({ _id, email, role }, true),
    },
    error: null,
  });
};

module.exports = { register, login, refresh };
