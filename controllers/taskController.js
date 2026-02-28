const Task = require("../models/Task");

// Bug: used .then() without error handling and returned 200 instead of 201
// Fix: refactored to async/await with try/catch and corrected status code

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = await Task.create({ title });

    res.status(201).json({ msg: "Task Created", data: task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Bug: used .then() and no error handling
// Fix: converted to async/await with try/catch

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ msg: "Tasks List", data: tasks });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Bug: missing error handling
// Fix: added try/catch and proper async handling

const createTaskWithCheck = async (req, res) => {
  try {
    const { title } = req.body;

    const exist = await Task.findOne({ title });
    if (exist) {
      return res.status(400).json({ msg: "Task already exists" });
    }

    const task = await Task.create({ title });

    res.status(201).json({ msg: "Task Created", data: task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  createTaskWithCheck,
};
