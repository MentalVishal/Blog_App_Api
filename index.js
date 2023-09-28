const express = require("express");
const { Connection } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { blogRouter } = require("./Routes/blogRouter");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("", userRouter);
app.use("/blogs", blogRouter);

app.listen(process.env.port, async () => {
  try {
    await Connection;
    console.log("Connected to the Server");
    console.log(`running on port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
