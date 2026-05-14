const express = require("express");
const connectDB = require("../src/config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Naval",
    lastName: "Ravikant",
    emailID: "naval@gmail.com",
    age: 48,
    password: "Pass@1234",
  });
  try {
    await user.save();
    res.send("New user created successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Something went wrong");
  });
