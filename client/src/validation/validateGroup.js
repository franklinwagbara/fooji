const Joi = require("joi");

const validateGroup = (group) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    is_completed: Joi.boolean(),
  });
  return schema.validate(group, { abortEarly: false });
};

export default validateGroup;
