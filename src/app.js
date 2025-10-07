const express = require("express");
const app = express();

// app.use("/user", (req, res) => {
//   res.send("Pro User !!!");
// });

app.get("/user", (req, res) => {
  res.send("Get User");
});

app.post("/user", (req, res) => {
  res.send("Post User");
});

app.patch("/user", (req, res) => {
  res.send("Patch User");
});
app.delete("/user", (req, res) => {
  res.send("Delete User");
});

app.listen(7777, () => {
  console.log("Server listening to port 7777");
});
