module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.difine(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter title",
        },
      },

      author: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter title",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please Enter title",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: "Please Enter title",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
          as: "userId",
        },
      },
    },
    {}
  );
  Book.associate = (models) => {
    Book.belongsto(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Book;
};
