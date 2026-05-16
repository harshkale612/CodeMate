const express = require("express");
const connectDB = require("../src/config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("New user created successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong ");
  }
});
app.get("/user", async (req, res) => {
  const userMail = req.body.emailID;
  try {
    const user = await User.findOne({ emailID: userMail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("Somthing went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error("Something went wrong ");
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
