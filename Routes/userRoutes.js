const express = require("express");
const { userModel } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, avatar, email, password } = req.body;
  const registerUser = await userModel.findOne({ email });
  if (registerUser) {
    res.status(400).json({ error: "User Already exist...!" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          const user = new userModel({
            username,
            avatar,
            email,
            password: hash,
          });
          await user.save();
          res.status(200).json({ msg: "User Succefull Registered..." });
        }
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ username: user.username }, "masai");
          res.status(200).json({ msg: "Login Sucessful", token: token });
        } else {
          res.status(400).json({ error: "Check your Credential" });
        }
      });
    } else {
      res.status(400).json({ error: "No user exist...!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = {
  userRouter,
};
