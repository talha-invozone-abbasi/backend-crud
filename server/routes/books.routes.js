const express = require("express");
const {
  createBook,
  getBooks,
  getSingleBook,
  deleteSingleBook,
} = require("../controllers/books.controllers");

const routes = express.Router();

routes.post("/:userId", createBook);
routes.get("/", getBooks);
routes.get("/:id", getSingleBook);
routes.delete("/:id", deleteSingleBook);

module.exports = routes;
