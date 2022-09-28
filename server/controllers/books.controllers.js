const Book = require("../models/").Book;

const createBook = (req, res) => {
  const { title, author, description, quantity } = req.body;
  const { userId } = req.params;
  const action = Book.create({
    title,
    author,
    description,
    quantity,
    userId,
  }).then((response) => {
    return res
      .status(201)
      .json({
        success: true,
        data: response,
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          data: error?.message,
        });
      });
  });
};

const getBooks = (req, res) => {
  const action = Book.findAll().then((data) => {
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

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  const action = await Book.findAll({ where: { id: id } });
  // console.log(action);
  try {
    if (action.length === 0) {
      return res.json({
        success: false,
        message: "Book not found",
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
const deleteSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Book.destroy({ where: { id } });
    if (!action) {
      return res.json({
        message: "Book not found",
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
  createBook,
  getBooks,
  getSingleBook,
  deleteSingleBook,
};
