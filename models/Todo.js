const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    task: { type: String, required: true },
    is_completed: { type: Boolean, default: false },
    group_id: { type: Schema.Types.ObjectId, required: false },
    date_completed: { type: Date },
  },
  { timestamps: true }
);

const Todo = model("Todo", TodoSchema);
module.exports = Todo;
