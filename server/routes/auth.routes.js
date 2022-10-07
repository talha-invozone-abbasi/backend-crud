const express = require("express");
const { SignupUser, login } = require("../controllers/auth.controller");
const { createBook } = require("../controllers/books.controller");
const {
  loginVerification,
  CreateUserValidation,
} = require("../middlewares/validations");

const routes = express.Router();

routes.post("/signup", [...CreateUserValidation], SignupUser);
routes.post("/login", [...loginVerification], login);
module.exports = routes;
