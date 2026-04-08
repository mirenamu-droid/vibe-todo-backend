const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "잘못된 id입니다." });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: "할일을 찾을 수 없습니다." });
  }
  res.json(todo);
});

module.exports = router;
