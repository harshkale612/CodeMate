const express = require("express");
const app = express();

app.use("/admin", (req, res, next) => {
  const token = "xyz";
  isAuthorised = token === "xyz";
  if (!isAuthorised) {
    res.status(401).send("Unauthorised");
  } else {
    next();
  }
});

app.use("/admin/getAllData", (req, res) => {
  res.send("Admin data");
});

app.listen(7777, () => {
  console.log("Listening on port 7777");
});
