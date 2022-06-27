const Joi = require("joi");

/*
  Login data schema:
    email: string
    password: string
*/

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "co"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(data, { abortEarly: false });
};
export default validateLogin;
