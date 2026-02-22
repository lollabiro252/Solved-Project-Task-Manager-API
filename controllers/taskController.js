const Task = require("../models/Task");

const createTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });

  Task.create({ title }).then((task) => {
    res.status(200).json({ msg: "Task Created", data: task });
  });
};

const getTasks = (req, res) => {
  Task.find().then((tasks) => {
    res.status(200).json({ msg: "Tasks List", data: tasks });
  });
};

const createTaskWithCheck = async (req, res) => {
  const { title } = req.body;
  const exist = await Task.findOne({ title });
  if (exist) return res.status(400).json({ msg: "Task already exists" });

  const task = await Task.create({ title });
  res.status(201).json({ msg: "Task Created", data: task });
};

module.exports = {
  createTask,
  getTasks,
  createTaskWithCheck,
};
