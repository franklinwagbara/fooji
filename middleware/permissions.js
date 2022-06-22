const User = require("../models/User");
const jwt = require("jsonwebtoken");

const requiresAuth = async (req, res, next) => {
  const token = req.cookies["access-token"];
  let isAuthed = false;

  if (token) {
    try {
      const { user_id } = jwt.verify(token, process.env.JWT_SECRET);

      try {
        const user = await User.findById(user_id);

        if (user) {
          const userReturned = { ...user._doc };
          delete userReturned.password;
          req.user = userReturned;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }

  if (isAuthed) {
    return next();
  } else {
    return res.status(401).send("Unauthorised access!");
  }
};

module.exports = requiresAuth;
