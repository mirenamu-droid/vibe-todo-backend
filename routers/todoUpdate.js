const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const router = express.Router();

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "잘못된 id입니다." });
  }

  const { title, completed } = req.body;
  const update = {};

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({ error: "title은 비어 있지 않은 문자열이어야 합니다." });
    }
    update.title = title.trim();
  }
  if (completed !== undefined) {
    update.completed = Boolean(completed);
  }

  if (Object.keys(update).length === 0) {
    return res
      .status(400)
      .json({ error: "수정할 필드가 없습니다. (title, completed)" });
  }

  const todo = await Todo.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return res.status(404).json({ error: "할일을 찾을 수 없습니다." });
  }
  res.json(todo);
});

module.exports = router;
