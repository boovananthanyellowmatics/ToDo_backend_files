const express = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

// GET all todos
router.get("/", getTodos);

// CREATE todo
router.post("/", createTodo);

// UPDATE todo
router.put("/:id", updateTodo);

// DELETE todo
router.delete("/:id", deleteTodo);

module.exports = router;