const { Schema, model } = require("mongoose");

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    is_completed: { type: String, required: true },
  },
  { timestamps: true }
);

const Group = model("Group", GroupSchema);
module.exports = Group;
