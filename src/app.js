const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  // res.send("Hi");
  next();
});
app.use(
  "/user",
  (req, res, next) => {
    // console.log("Res 1");
    // res.send("First Respont");
    next();
  },
  (req, res) => {
    console.log("Res 2");
    res.send("Second Respont");
  }
);

app.listen(7777, () => {
  console.log("Server listening on port 7777");
});
