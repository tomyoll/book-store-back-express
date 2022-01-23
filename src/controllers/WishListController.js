const wishListService = require('../services/WishListService');
const {
  failMessage,
  successMessage,
} = require('../utils/ApiMessage');
const { MESSAGE } = require('../constants');

const add = async (req, res) => {
  try {
    const { user } = req.params;
    const { books } = req.body;
    const wishList = await wishListService.add(books, user);
    return res.json(successMessage(wishList));
  } catch (err) {
    return res.status(400).json(failMessage([err.message]));
  }
};

const get = async (req, res) => {
  try {
    const { user } = req.params;
    const wishList = await wishListService.get(user);
    return res.json(successMessage(wishList));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.WISHLIST_ADD_ERROR]));
  }
};

module.exports = {
  add,
  get,
};
