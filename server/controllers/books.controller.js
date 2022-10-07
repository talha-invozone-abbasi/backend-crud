const Book = require("../models/").Book;
const asyncHandler = require("express-async-handler");

const createBook = asyncHandler((req, res) => {
  const { title, author, description, quantity } = req.body;
  const { userId } = req.params;
  const action = Book.create({
    title,
    author,
    description,
    quantity,
    userId,
  });
  if (action) {
    try {
      return res.status(201).json({
        success: true,
        data: action,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: error?.message,
      });
    }
  }
});

const getBooks = asyncHandler((req, res) => {
  const action = Book.findAll();
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
