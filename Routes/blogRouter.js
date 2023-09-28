const express = require("express");
const { authMiddleware } = require("../Middleware/authMiddleware");
const { blogModel } = require("../Models/blogModel");

const blogRouter = express.Router();

blogRouter.use(authMiddleware);

blogRouter.get("", async (req, res) => {
  const { username } = req.body;
  const { title, category, order } = req.query;
  const query = {};
  if (title) {
    query.title = title;
  }
  if (category) {
    query.category = category;
  }
  if (order) {
    query.order = order;
  }
  try {
    const post = await blogModel.find(query);
    res.status(200).json({ msg: "All Blogs", post: post });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

blogRouter.patch("/:id", async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;
  const post = await blogModel.findByIdAndUpdate(
    { _id: id, usename: username },
    req.body
  );
  if (!post) {
    res.status(400).json({ error: "Blogs not Found" });
  } else {
    res.status(200).json({ msg: "Blogs updated" });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;
  const post = await blogModel.findByIdAndDelete({
    _id: id,
    usename: username,
  });
  if (!post) {
    res.status(400).json({ error: "Blogs not Found" });
  } else {
    res.status(200).json({ msg: "Blogs Deleted" });
  }
});

blogRouter.patch("/:id/like", async (req, res) => {
  const { id } = req.params;
  const post = await blogModel.findByIdAndUpdate({ _id: id }, req.body);
  if (!post) {
    res.status(400).json({ error: "Blogs not Found" });
  } else {
    res.status(200).json({ msg: "Blogs Liked" });
  }
});

blogRouter.patch("/:id/comment", async (req, res) => {
  const { username, content } = req.body;
  const { id } = req.params;
  const data = {
    username: username,
    content: content,
  };
  try {
    const post = await blogModel.findOne({ _id: id });
    post.comments.push(data);
    await post.save();
    res.status(200).json({ msg: "comented" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

blogRouter.post("", async (req, res) => {
  const { username } = req.body;
  if (username) {
    try {
      const post = new blogModel(req.body);
      await post.save();
      res.status(200).json({ msg: "Post sucessfull" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(400).json({ error: "Please Login" });
  }
});

module.exports = {
  blogRouter,
};
