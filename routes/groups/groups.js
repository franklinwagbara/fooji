const express = require("express");
const Group = require("../../models/Group");
const requiresAuth = require("../../middleware/permissions");
const validateGroup = require("../../validation/validateGroup");

const router = express.Router();

/*
    @route  GET /api/groups/test
    @desc   Test the groups route
    @access Public
*/
router.get("/test", (req, res) => {
  return res.send("Groups route is active.");
});

/*
    @route  GET /api/groups/
    @desc   Get current user's todo groups
    @access Private
*/
router.get("/", requiresAuth, async (req, res) => {
  try {
    const completedGroups = await Group.find({
      user: req.user._id,
      is_completed: true,
    }).sort({ completed_at: -1 });

    const incompleteGroups = await Group.find({
      user: req.user._id,
      is_completed: false,
    }).sort({ createAt: -1 });

    return res.send({ completedGroups, incompleteGroups });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  GET /api/groups/:id
    @desc   Get a current user's todo group
    @access Private
*/
router.get("/:id", requiresAuth, async (req, res) => {
  try {
    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!group) return res.status(404).send({ error: "Group not found." });

    return res.send(group);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  POST /api/groups
    @desc   Create a new todo group for the current user
    @access Private
*/
router.post("/", requiresAuth, async (req, res) => {
  try {
    const { error } = validateGroup(req.body);

    if (error) return res.status(400).send({ error: error.details[0].message });

    const newGroup = new Group({
      user: req.user._id,
      name: req.body.name,
      is_completed: req.body.is_completed,
      completed_at: req.body.is_completed === true ? new Date() : null,
    });

    await newGroup.save();

    return res.send(newGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  PUT /api/groups/:id/complete
    @desc   Update a todo group to complete for the current user 
    @access Private
*/
router.put("/:id/complete", requiresAuth, async (req, res) => {
  try {
    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!group) return res.status(404).send({ error: "Group does not exit." });

    if (group?.is_completed && group.is_completed === true) {
      console.log(group.is_completed === true);
      return res.status(400).send({ error: "Group is already complete" });
    }

    const updatedGroup = await Group.findOneAndUpdate(
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

    return res.send(updatedGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  PUT /api/groups/:id/incomplete
    @desc   Update a todo group to incomplete for the current user
    @access Private
*/
router.put("/:id/incomplete", requiresAuth, async (req, res) => {
  try {
    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!group) return res.status(404).send({ error: "Group was not found." });

    if (!group.is_completed) {
      return res.status(400).send({ error: "Group is already incomplete." });
    }

    const updatedGroup = await Group.findOneAndUpdate(
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

    return res.send(updatedGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  PUT /api/groups/:id/
    @desc   Update a todo group for the current user
    @access Private
*/
router.put("/:id", requiresAuth, async (req, res) => {
  try {
    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!group) return res.status(404).send({ error: "Group was not found." });

    const updatedGroup = await Group.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        name: req.body.name,
        is_completed: req.body.is_completed,
        completed_at: req.body.is_completed === true ? new Date() : null,
      },
      { new: true }
    );

    return res.send(updatedGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/*
    @route  DELETE /api/groups/:id
    @desc   Delete a todo group for the current user
    @access Private
*/
router.delete("/:id", requiresAuth, async (req, res) => {
  try {
    const group = await Group.findOne({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!group) return res.status(404).send({ error: "Group not found." });

    await Group.findOneAndDelete({ user: req.user._id, _id: req.params.id });

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
