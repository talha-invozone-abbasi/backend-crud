const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
} = require("../controllers/user.contoller");
const auth = require("../middlewares/auth");
const { CreateUserValidation } = require("../middlewares/validations");

const routes = express.Router();

routes.post("/", CreateUserValidation, createUser);
routes.get("/", [auth], getAllUsers);
routes.get("/:id", [auth], getSingleUser);
routes.put("/:id", [auth], updateSingleUser);
routes.delete("/:id", [auth], deleteSingleUser);
module.exports = routes;
