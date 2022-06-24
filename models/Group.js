const { Schema, model } = require("mongoose");

const GroupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    is_completed: { type: Boolean, default: false },
    completed_at: { type: Date },
  },
  { timestamps: true }
);

const Group = model("Group", GroupSchema);
module.exports = Group;
