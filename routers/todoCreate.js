const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title은 필수 문자열입니다." });
  }
  const todo = await Todo.create({
    title: title.trim(),
    completed: Boolean(completed),
  });
  res.status(201).json(todo);
});

module.exports = router;
