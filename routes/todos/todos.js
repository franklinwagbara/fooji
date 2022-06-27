const express = require("express");
const validateTodo = require("../../validation/validateTodo");
const Todo = require("../../models/Todo");
const Group = require("../../models/Group");
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
  @route  GET /api/todos/current
  @desc   Get current user's todos
  @access Private
*/
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completedTodos = await Todo.find({
      user: req.user._id,
      is_completed: true,
    }).sort({ completed_at: -1 });

    const incompleteTodos = await Todo.find({
      user: req.user._id,
      is_completed: false,
    }).sort({ createdAt: -1 });

    return res.send({
      completed_todos: completedTodos,
      incomplete_todos: incompleteTodos,
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
router.post("/current", requiresAuth, async (req, res) => {
  try {
    const { error } = validateTodo(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    //create a new todo
    const newTodo = new Todo({
      user: req.user._id,
      task: req.body.task,
      is_completed: req.body.is_completed,
      completed_at: req.body.is_completed === true ? new Date() : null,
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

    if (todo.is_completed === true)
      return res.status(400).send({ error: "Todo is already completed." });

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        is_completed: true,
        completed_at: new Date(),
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

    const { error } = validateTodo(req.body);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        task: req.body.task,
        is_completed: req.body.is_completed,
        competed_at: req.body.is_completed === true ? new Date() : null,
      },
      { new: true }
    );

    return res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  PUT /api/todos/:id/incomplete
  @desc   Update a single current user's todo to completed status
  @access Private
*/
router.put("/:id/incomplete", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ user: req.user._id, _id: req.params.id });

    if (!todo) {
      return res.status(404).send({ error: "Todo was not found." });
    }

    if (todo.is_completed === false)
      return res.status(400).send({ error: "Todo is already incomplete." });

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        is_completed: false,
        completed_at: null,
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
  @route  POST /api/todos/addToGroup/:to_id/:group_id
  @desc   Add todo to a group
  @access Private
*/
router.post("/addToGroup/:to_id/:group_id", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      user: req.user._id,
      _id: req.params.to_id,
    });

    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.group_id,
    });

    if (!todo || !group)
      return res
        .status(404)
        .send({ error: "Todo or Group does not exist in database." });

    const updatedTodo = await Todo.findOneAndUpdate(
      { user: req.user._id, _id: req.params.to_id },
      {
        group_id: req.params.group_id,
      },
      { new: true }
    );

    return res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  POST /api/todos/removeFromGroup/:to_id
  @desc   Removes todo from a group
  @access Private
*/
router.post("/removeFromGroup/:to_id", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      user: req.user._id,
      _id: req.params.to_id,
    });

    if (!todo)
      return res
        .status(404)
        .send({ error: "Todo or Group does not exist in database." });

    const updatedTodo = await Todo.findOneAndUpdate(
      { user: req.user._id, _id: req.params.to_id },
      {
        group_id: null,
      },
      { new: true }
    );

    return res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
  @route  DELETE /api/todos/:id
  @desc   Removes todo from a group
  @access Private
*/
router.delete("/:id", requiresAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ user: req.user._id, _id: req.params.id });

    if (!todo) return res.status(400).send({ error: "Todo not found." });

    await Todo.findOneAndDelete({
      user: req.user._id,
      _id: req.params.id,
    });

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});
module.exports = router;
