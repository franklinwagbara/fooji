const express = require("express");
const validateTodo = require("../../validation/validateTodo");
const { todos, group } = require("./db");
const Todo = require("../../models/Todo");
const requiresAuth = require("../../middleware/permissions");

const router = express.Router();

/*
  @route  GET /api/todos/test
  @desc   Test the todos route
  @access Public
*/
router.get("/test", (req, res) => {
  res.send("Todos route is working");
});

/*
  @route  GET /api/todos/
  @desc   Get current user's todos
  @access Private
*/
router.get("/", requiresAuth, async (req, res) => {
  try {
    const completedTodos = await Todo.find({
      user: req.user._id,
      is_completed: true,
    }).sort({ date_completed: -1 });

    const uncompletedTodos = await Todo.find({
      user: req.user._id,
      is_completed: false,
    }).sort({ createdAt: -1 });

    return res.send({
      completed_todos: completedTodos,
      uncompleted_todos: uncompletedTodos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  GET /api/todos/:id
  @desc   Get a single current user's todo
  @access Private
*/
router.get("/:id", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findById({
      user: req.user._id,
      _id: req.params.id,
    });

    return res.send(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  POST /api/todos/
  @desc   Create a new todo
  @access Private
*/
router.post("/", requiresAuth, async (req, res) => {
  try {
    const { error } = validateTodo(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    //create a new todo
    const newTodo = new Todo({
      user: req.user._id,
      task: req.body.task,
      is_completed: req.body.is_completed,
    });

    //save to the database
    await newTodo.save();

    return res.send(newTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  PUT /api/todos/:id/complete
  @desc   Update a single current user's todo to completed status
  @access Private
*/
router.put("/:id/complete", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ user: req.user._id, _id: req.params.id });

    if (!todo) {
      return res.status(404).send({ error: "Todo was not found." });
    }

    console.log("todo.is_completed", todo.is_completed, todo);
    if (todo.is_completed)
      return res.status(400).send({ error: "Todo is already completed." });

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        is_completed: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );

    return res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  PUT /api/todos/:id
  @desc   Update a single current user's todo
  @access Private
*/
router.put("/:id", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ user: req.user._id, _id: req.params.id });

    if (!todo) {
      return res.status(404).send({ error: "Todo was not found." });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        task: req.body.task,
        is_completed: req.body.is_completed,
        completedAt: new Date(),
      },
      { new: true }
    );

    return res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
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
