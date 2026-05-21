const express = require("express");
const connectDB = require("../src/config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();
const { validSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validSignUpData(req);
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("New user created successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await jwt.sign({ _id: user._id }, "Codemate@123");

      res.cookie("token", token);
      res.send("Login successfully");
    }
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodeMessage = await jwt.verify(token, "Codemate@123");
    const { _id } = decodeMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invaid User");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err.message);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err.message);
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
    res.status(400).send("Somthing went wrong " + err.message);
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
    res.status(400).send("Somthing went wrong " + err.message);
  }
});
app.delete("/user", async (req, res) => {
  const userID = req.body.userID;

  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong " + err.message);
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
