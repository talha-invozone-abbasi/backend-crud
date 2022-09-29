const Book = require("../models/").Book;
const asyncHandler = require("express-async-handler");

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
  const action = Book.findAll()
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

const getSingleBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const action = await Book.findOne({ where: { id: id } });

  if (!action) {
    res.status(404);
    throw new Error("Book not found");
  }
  return res.json({
    success: true,
    message: action?.message,
    action,
  });
});
const deleteSingleBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const action = await Book.destroy({ where: { id } });
  if (!action) {
    res.status(404);
    throw new Error("Book not found");
  }
  return res
    .json({
      message: "Deleted Successfully",
      action,
    })
    .status(200);
});

module.exports = {
  createBook,
  getBooks,
  getSingleBook,
  deleteSingleBook,
};
