const User = require("../models/").User;

const createUser = async (req, res) => {
  const { firstName, email, username, password } = req.body;

  const findAll = await User.findAll({ where: { email: email } });
  if (!findAll) {
    const action = User.create({
      firstName,
      email,
      username,
      password,
    })
      .then((user) => {
        res
          .json({
            success: true,
            message: action.message,
            data: user,
          })
          .status(200);
      })
      .catch((err) =>
        res.json({
          // success: true,
          message: err.message,
          // data: action,
        })
      );
  } else {
    res.json({
      // success: true,
      message: "Email Already Exists",
      // data: action,
    });
  }
};
const getAllUsers = (req, res) => {
  const action = User.findAll()
    .then((data) => {
      return res.json({
        success: true,
        message: data?.message,
        data,
      });
    })
    .catch((err) => {
      throw new Error(err?.message);
    });
  return action;
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const action = await User.findOne({ where: { id: id } });
  console.log(action);
  try {
    if (!action) {
      res.status(404);
      throw new Error("Not found");
    }
    return res.json({
      success: true,
      message: action?.message,
      action,
    });
  } catch (err) {
    throw new Error(err?.message);
  }
};
const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
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
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
