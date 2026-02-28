const mongoose = require("mongoose");

// Bug: isCompleted was defined as String with default "false"
// Fix: changed type to Boolean and default to false

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Improvement: added timestamps for better tracking
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
