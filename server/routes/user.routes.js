const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
} = require("../controllers/user.contollers");

const routes = express.Router();

routes.post("/", createUser);
routes.get("/", getAllUsers);
routes.get("/:id", getSingleUser);
routes.delete("/:id", deleteSingleUser);
module.exports = routes;
