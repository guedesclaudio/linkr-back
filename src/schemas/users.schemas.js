import joi from "joi";

const newUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().empty(" ").required(),
  username: joi.string().empty(" ").required(),
  picture_url: joi.string().uri().empty().required(),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().empty(" ").required(),
});

export { newUserSchema, userLoginSchema };
