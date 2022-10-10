const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter Your name",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter Your name",
        },
        unique: { args: true, msg: "The Email is already taken" },
        validate: {
          isEmail: {
            args: true,
            msg: "Please Enter the valid Email address",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter Your username",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter Your name",
        },
        validate: {
          isNotShort: (value) => {
            if (value.length < 8) {
              throw new Error("Password must be greater then 8 digits");
            }
          },
        },
      },
    },
    {
      hooks: {
        beforeUpdate: (user, options) => {
          user.username = " before Update";
        },
        afterUpdate: async (user, options) => {
          user.username += " after Update";
        },
        beforeCreate: async (user, options) => {
          let password = await bcrypt.genSalt(10);
          let hashpassword = await bcrypt.hash(user.password, password);
          user.password = hashpassword;
        },
        afterCreate: async (user, options) => {
          // await user.save();
          // console.log(user, "After create");
        },
      },
    }
  );
  User.addHook("beforeValidate", "beforeVal", async (user, options) => {
    if (user.firstName.length < 5) {
      return Promise.reject(new Error("First name must be at least 6"));
    }
  });

  User.addHook("afterValidate", "afterVal", async (user, options) => {
    // User.removeHook("beforeValidate", "beforeVal");
    // console.log("Hook Removed");
  });
  User.associate = (model) => {
    User.hasMany(model.Book, {
      foreignKey: "userId",
    });
  };
  return User;
};
