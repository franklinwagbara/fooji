const Joi = require("joi");

/*
  Login data schema:
    email: string
    password: string
*/

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co"] },
    }),
    username: Joi.string().alphanum().min(4).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
  }).with("password", "confirm_password");

  return schema.validate(data);
};

module.exports = validateRegister;
