const wishListModel = require('../models/WishList');

const add = async (books, user) => {
  const wishList = await wishListModel.findOne({ user });
  if (Array.isArray(books)) {
    wishList.books = books;
    await wishList.save();
  }
};

const get = async (user) => wishListModel.findOne({ user });

module.exports = {
  add,
  get,
};
