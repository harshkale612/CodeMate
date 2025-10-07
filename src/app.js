const express = require("express");
const app = express();

app.use("/home", (req, res) => {
  res.send("You are on Home");
});

app.use("/test", (req, res) => {
  res.send("Tesing....");
}),
  app.use("/", (req, res) => {
    res.send("Hello World");
  });
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});
