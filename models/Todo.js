const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    name: { type: String, required: true },
    is_completed: { type: Boolean, required: true },
    group_id: { type: String, required: false },
  },
  { timestamps: true }
);

const User = model("Todo", TodoSchema);
module.exports = User;
