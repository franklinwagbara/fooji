const Joi = require("joi");

const validateTodo = (todo) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    is_completed: Joi.boolean().required(),
  });
  return schema.validateAsync(todo);
};

module.exports = validateTodo;
