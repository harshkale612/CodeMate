const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://User:QGOEP9xdS2nsefOn@codemate.dt7booy.mongodb.net/codemate",
  );
};

module.exports = connectDB;
