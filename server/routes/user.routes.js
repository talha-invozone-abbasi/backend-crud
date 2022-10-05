const express = require("express");
const {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
} = require("../controllers/user.contollers");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.post("/", createUser);
routes.get("/", [auth], getAllUsers);
routes.get("/:id", [auth], getSingleUser);
routes.put("/:id", [auth], updateSingleUser);
routes.delete("/:id", [auth], deleteSingleUser);
module.exports = routes;
