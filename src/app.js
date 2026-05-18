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
    res.status(400).send("Somthing went wrong " + err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err);
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
    res.status(400).send("Somthing went wrong " + err);
  }
});
app.patch("/user/:userID", async (req, res) => {
  const userID = req.params.userID;
  const data = req.body;
  try {
    const Allowed_Updates = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills must be less than 10");
    }
    const user = await User.findByIdAndUpdate(userID, data, {
      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err);
  }
});
app.delete("/user", async (req, res) => {
  const userID = req.body.userID;

  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("User deleted successfully");
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
