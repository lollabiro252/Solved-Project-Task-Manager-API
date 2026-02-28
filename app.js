// Bug: package.json main was pointing to index.js and no start script existed
// Fix: updated main to app.js and added start/dev scripts in package.json

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

// DB Connection

// Bug: MongoDB URI was undefined due to incorrect environment variable name
// Fix: Updated .env variable to match process.env.DB_URL


 // Bug: Used promise chaining instead of async/await
// Fix: Refactored database connection to async/await

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
