const { body } = require("express-validator");

const CreateUserValidation = [
  body("firstName").not().isEmpty(),
  body("email").isEmail().isEmpty(),
  body("password").not().isEmpty(),
  body("username").not().isEmpty(),
];

const loginVerification = [
  body("email").isEmail().isEmpty(),
  body("password").not().isEmpty(),
];

module.exports = {
  CreateUserValidation,
  loginVerification,
};
