const Joi = require("joi");

/*
  Todo data schema:
    user: string,
    task: string,
    is_completed: boolean,
    group_id: string,
    date_completed: Date,
*/
const validateTodo = (todo) => {
  const schema = Joi.object({
    task: Joi.string().min(4).required(),
    is_completed: Joi.boolean(),
    group_id: Joi.string(),
    date_completed: Joi.date(),
    completed_at: Joi.date(),
  });
  return schema.validate(todo);
};

module.exports = validateTodo;
