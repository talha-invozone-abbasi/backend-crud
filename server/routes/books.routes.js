const express = require("express");
const {
  createBook,
  getBooks,
  getSingleBook,
  deleteSingleBook,
} = require("../controllers/books.controllers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.post("/:userId", createBook);
routes.get("/", [auth], getBooks);
routes.get("/:id", [auth], getSingleBook);
routes.delete("/:id", [auth], deleteSingleBook);

module.exports = routes;
