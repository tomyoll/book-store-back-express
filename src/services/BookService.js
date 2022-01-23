const path = require('path');
const fs = require('fs');
const bookModel = require('../models/Book');
const wishListModel = require('../models/WishList');

const getOne = async (id) => bookModel.findById(id);

const getFromWishList = async (id) => {
  const wishList = await wishListModel.findOne({ user: id });
  return bookModel.find({ _id: { $in: wishList.books } });
};

const remove = async (id) => {
  await bookModel.findByIdAndRemove(id)
    .then((book) => {
      if (book.image === 'noimage.jpg') {
        fs.unlink(path.resolve(__dirname, '../..', 'static', book.image));
      }
    });
  return wishListModel.updateMany({ books: id }, { $pull: { books: id } });
};

const createOrUpdate = async (body, files, id) => {
  const {
    name, domain, publisher, year, language, pages, description, price,
  } = body;
  let image;
  let fileName;

  const authorString = JSON.parse(body.author);
  const translatorString = JSON.parse(body.translator);
  const author = [];
  const translator = [];
  authorString.forEach((item) => author.push(item.name));
  translatorString.forEach((item) => translator.push(item.name));

  if (files) {
    image = files.image;
    fileName = `${Date.now()}.jpg`;
    await image.mv(path.resolve(__dirname, '../..', 'static', fileName));
  } else if (!id) {
    fileName = 'noimage.jpg';
  }

  const bookData = {
    name,
    domain,
    price,
    author,
    publisher,
    year,
    language,
    pages,
    translator,
    description,
    image: fileName,
  };

  if (id && fileName) {
    return bookModel.findByIdAndUpdate(id, bookData);
  }

  if (id) {
    delete bookData.image;
    return bookModel.findByIdAndUpdate(id, bookData);
  }

  return bookModel.create(bookData);
};

const getAll = async (query) => {
  let { limit, page } = query;
  const { domainID } = query;
  page = page || 1;
  limit = limit || 12;
  const offset = page * limit - limit;
  let books;
  if (!domainID) {
    books = await bookModel.find({}).skip(offset).limit(limit);
  }
  if (domainID) {
    books = await bookModel.find({ domain: domainID }).skip(offset).limit(limit);
  }
  const allBooks = await bookModel.find();
  let count = allBooks.length;
  if (!allBooks) count = 0;
  return { books, count };
};

module.exports = {
  createOrUpdate,
  getAll,
  getOne,
  getFromWishList,
  remove,
};
