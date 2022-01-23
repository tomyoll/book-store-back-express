const bookService = require('../services/BookService');
const checkValidation = require('../utils/CheckValidation');
const { MESSAGE } = require('../constants');
const { successMessage, failMessage } = require('../utils/ApiMessage');

const create = async (req, res) => {
  try {
    const validationErrors = checkValidation(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(failMessage(validationErrors));
    }
    const book = await bookService.createOrUpdate(req.body, req.files);
    return res.json(successMessage(book));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const getAll = async (req, res) => {
  const books = await bookService.getAll(req.query);
  return res.json(successMessage(books));
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const validationErrors = checkValidation(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(failMessage(validationErrors));
    }
    const book = await bookService.createOrUpdate(req.body, req.files, id);
    return res.json(successMessage(book));
  } catch (err) {
    return res.status(400).json(failMessage(MESSAGE.UNEXPECTED_ERROR));
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getOne(id);
    return res.json(successMessage(book));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const getFromWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await bookService.getFromWishList(id);
    return res.json(successMessage(books));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await bookService.remove(id);
    return res.json(successMessage(books));
  } catch (err) {
    return res.json(failMessage(MESSAGE.UNEXPECTED_ERROR));
  }
};

module.exports = {
  create,
  getAll,
  edit,
  getOne,
  deleteBook,
  getFromWishList,
};
