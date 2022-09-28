const express = require("express");
const { SignupUser, login } = require("../controllers/auth.controllers");
const { createBook } = require("../controllers/books.controllers");

const routes = express.Router();

routes.post("/signup", SignupUser);
routes.post("/login", login);
module.exports = routes;
