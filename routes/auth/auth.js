const express = require("express");
const extractErrors = require("./../../validation/extractErrors");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegister = require("../../validation/validateRegister");
const requiresAuth = require("../../middleware/permissions");
const validateLogin = require("../../validation/validateLogin");

const router = express.Router();

/* @route   GET /api/auth/test
   @desc    Test the auth route
   @access  Public
*/
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

/* @route   GET /api/auth/register
   @desc    Create a new user
   @access  Public
*/
router.post("/register", async (req, res) => {
  try {
    const { error } = validateRegister(req.body);

    if (error) {
      return res.status(400).send(extractErrors(error));
    }

    //check for existing user
    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (existingEmail)
      return res
        .status(400)
        .send({ error: "There is already a user with this email" });

    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    //create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });

    //save the user to the database
    const savedUser = await newUser.save();

    //Persisting user login sessions on client's machine
    const payload = { user_id: savedUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    //Remove password field from the User object return to the client
    const userReturned = { ...savedUser._doc };
    delete userReturned.password;

    return res.send(userReturned);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

/* @route   GET /api/auth/login
   @desc    Login user and return an access token
   @access  Public
*/
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).send(extractErrors(error));
    }
    //check for the user
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (!user) {
      return res
        .status(400)
        .send({ error: "There was a problem with your login credentials." });
    }

    //verify password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .send({ error: "There was a problem with your login credentials." });
    }

    //Persisting user login sessions on client's machine
    const payload = { user_id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const userReturned = { ...user._doc };
    delete userReturned.password;

    return res.send({ token: token, user: userReturned });
  } catch (error) {
    console.log(error);
    return res.status(500).send(err?.message);
  }
});

/* @route   GET /api/auth/current
   @desc    Return the current authenticated user
   @access  Private
*/
router.get("/current", requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized access!");
  }

  return res.send(req.user);
});

/* @route   PUT /api/auth/logout
   @desc    Logout user and clear the cookie
   @access  private
*/
router.put("/logout", requiresAuth, async (req, res) => {
  try {
    res.clearCookie("access-token");

    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
