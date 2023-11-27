const express = require("express");

const router = express.Router();

var todoId = 1;
var todos = [{ id: 1, title: "Cleaning", isDone: false }];

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "title not exist." });

  todoId++;

  var newTodo = { id: todoId, title: title, isDone: false };

  todos.push(newTodo);

  return res.json({ todo: newTodo });
});

router.get("/", (req, res) => {
  return res.send({ todos });
});

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;

  var existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) existTodo = v;
  });

  if (!existTodo) return res.status(400).json({ message: "id not exist" });

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  var existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) existTodo = v;
  });

  if (!existTodo) return res.status(400).json({ message: "id not exist" });

  var updateTodo;

  todos = todos.map((v, i) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updateTodo });
});

router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (!title) return res.return(400).json({ message: "title not exist." });

  var existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) existTodo = v;
  });

  if (!existTodo) return res.status(400).json({ message: "id not exist" });

  var updateTodo;

  todos = todos.map((v, i) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: title, isDone: v.isDone };
      return updateTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updateTodo });
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  var existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) existTodo = v;
  });

  if (!existTodo) return res.status(400).json({ message: "id not exist" });

  todos = todos.filter((v, i) => {
    if (v.id !== +todoId) {
      return v;
    }
  });

  return res.json({ message: "Delete success." });
});

module.exports = router;
