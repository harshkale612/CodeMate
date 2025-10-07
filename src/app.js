const express = require("express");
const app = express();

app.use("/user", (req, res) => {
  res.send("Pro User !!!");
});

app.listen(7777, () => {
  console.log("Server listening to port 7777");
});
