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
  const action = User.findAll().then((data) => {
    return res
      .json({
        success: true,
        message: data?.message,
        data,
      })
      .catch((err) => {
        return res.json({
          success: false,
          message: err.message,
        });
      });
  });
  return action;
};
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const action = await User.findAll({ where: { id: id } });
  // console.log(action);
  try {
    if (action.length === 0) {
      return res.json({
        success: false,
        message: "User not found",
        // action,
      });
    }
    return res.json({
      success: true,
      message: action?.message,
      action,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err?.message,
    });
  }
  return action;
};
const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const action = await User.destroy({ where: { id } });
    if (!action) {
      return res.json({
        message: "Id not found",
      });
    }
    return res
      .json({
        message: "Deleted Successfully",
        action,
      })
      .status(200);
  } catch (err) {
    res
      .json({
        message: err.message,
      })
      .status(500);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
