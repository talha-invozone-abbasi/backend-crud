const User = require("../models").User;
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req).formatWith((msg) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, email, username, password } = req.body;

  const findAll = await User.findOne({ where: { email: email } });
  if (!findAll) {
    const action = User.create({
      firstName,
      email,
      username,
      password,
    });
    if (action) {
      try {
        res
          .json({
            success: true,
            message: action.message,
            data: action,
          })
          .status(200);
      } catch (err) {
        res.json({
          // success: true,
          message: err.message,
          // data: action,
        });
      }
    }
  } else {
    res.json({
      // success: true,
      message: "Email Already Exists",
      // data: action,
    });
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  const action = await User.findAll();
  if (action) {
    try {
      return res.json({
        success: true,
        message: data?.message,
        data,
      });
    } catch (err) {
      throw new Error(err?.message);
    }
  }
  return action;
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const action = await User.findOne({ where: { id: id } });

  if (!action) {
    res.status(404);
    throw new Error("Not found");
  }
  return res.json({
    success: true,
    message: action?.message,
    action,
  });
});

const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const action = await User.destroy({ where: { id } });
  if (!action) {
    res.status(400);
    throw new Error("Id not Found");
  }
  return res
    .json({
      message: "Deleted Successfully",
      action,
    })
    .status(200);
});

const updateSingleUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req).formatWith((msg) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  let data = {
    firstName: req?.body?.firstName,
    username: req?.body?.username,
  };
  let action = await User.findOne({ where: { id } });
  if (action) {
    action.set(data);
    await action.save();
    return res.json(action);
  } else {
    console.log("Not found");
  }
});

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
