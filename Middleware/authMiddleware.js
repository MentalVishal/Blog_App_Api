const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.username = decoded.username;
        next();
      } else {
        res.status(400).json({ msg: "You are not Authorized" });
      }
    });
  } else {
    res.send("You are not Authorized");
  }
};

module.exports = {
  authMiddleware,
};
