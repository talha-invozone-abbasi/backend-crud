const sequelize = require("sequelize");
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
          console.log(user);
        },
        afterUpdate: (user, options) => {
          console.log(user, "After");
        },
        beforeCreate: (user, options) => {
          console.log(user);
        },
        afterCreate: (user, options) => {
          console.log(user, "After create");
        },
      },
    }
  );
  User.associate = (model) => {
    User.hasMany(model.Book, {
      foreignKey: "userId",
    });
  };
  return User;
};
