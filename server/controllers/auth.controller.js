const User = require("../models/").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const SignupUser = asyncHandler(async (req, res) => {
  const { firstName, email, username, password } = req.body;
  const findAll = await User.findOne({ where: { email: email } });
  if (!findAll) {
    const action = User.create({
      firstName,
      email,
      username,
      password: await bcrypt.hash(password, 10),
    });
    if (action) {
      try {
        let token = jwt.sign({ id: action.id }, process.env.JWT_SECRET, {
          expiresIn: 36000 * 3600,
        });
        res
          .json({
            success: true,
            message: action.message,
            data: action,
            token,
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

const login = async (req, res) => {
  const errors = validationResult(req).formatWith((msg) => msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const action = await User.findOne({ where: { email: email } });
    if (action) {
      let comparePass = await bcrypt?.compare(password, action.password);
      if (comparePass) {
        let token = jwt.sign({ id: action.id }, process.env.JWT_SECRET, {
          expiresIn: 3600 * 3600,
        });
        return res.status(200).json({
          success: true,
          message: "Login Successfully",
          token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid Criedential",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Criedential",
      });
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Invalid Criedential",
    });
  }
};

module.exports = {
  SignupUser,
  login,
};
