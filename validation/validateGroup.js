const Joi = require("joi");

const validateGroup = (group) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    is_completed: Joi.boolean().required(),
  });
  return schema.validateAsync(group);
};

module.exports = validateGroup;
