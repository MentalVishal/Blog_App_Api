const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    avatar: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};