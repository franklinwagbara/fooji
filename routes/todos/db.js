const Status = {
  COMPLETED: "Completed",
  NOT_COMPLETED: "Not Completed",
};
const todos = [
  {
    id: 1,
    name: "wash",
    date_created: Date.now(),
    is_completed: false,
    group_id: 1,
  },
];

const groups = [
  {
    id: 1,
    name: "group 1",
    date_created: Date.now(),
    is_completed: false,
  },
];

module.exports = { todos, groups };
