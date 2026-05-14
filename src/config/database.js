const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://express-backend:laZdaX28LWtgAJ76@backend-cluster.onsz78k.mongodb.net/codemate",
  );
};

module.exports = connectDB;
