const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [
      {
        username: String,
        content: String,
      },
    ],
  },
  { versionKey: false }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  blogModel,
};
