const express = require("express");
const validateTodo = require("../../validation/validateTodo");
const { todos, group } = require("./db");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(todos);
});

router.get("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  //input validation
  if (!todo) {
    return res
      .status(404)
      .send({ error: `The todo with id = ${req.params.id} was not found!` });
  }

  //add to database
  return res.send(todo);
});

router.post("/", (req, res) => {
  //input validation
  const { error } = validateTodo(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const todo = {
    id: todos.length + 1,
    name: req.body.name,
    date_created: Date.now(),
    is_completed: req.body.is_completed,
    group_id: null,
  };

  todos.push(todo);
  res.send(todo);
});

router.put("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  //start of: input validation
  if (!todo) {
    return res
      .status(404)
      .send({ error: `The todo with id = ${req.params.id} was not found!` });
  }

  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //end of: input validation

  todo.name = req.body.name;
  todo.is_completed = req.body.is_completed;

  return res.send(todo);
});

router.delete("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  if (!todo)
    return res
      .status(404)
      .send({ error: `The todo with id = ${req.params.id} was not found!` });

  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  return res.send(todo);
});
module.exports = router;
