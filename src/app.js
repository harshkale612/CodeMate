const express = require("express");
const app = express();

app.use("/user", (req, res) => {
  throw new Error("jfjdfdbah");

  res.send("Hello User");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Somthing went wrong");
  } else {
    next();
  }
});

app.listen(7777, () => {
  console.log("Listenig to port 7777");
});
