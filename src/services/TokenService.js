const jwt = require('jsonwebtoken');
const tokenModel = require('../models/Token');
const { MESSAGE } = require('../constants');

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userID, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userID });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({ user: userID, refreshToken });
  return token;
};

const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    return userData;
  } catch (err) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    return userData;
  } catch (err) {
    return null;
  }
};

const findToken = async (refreshToken) => {
  try {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  } catch (err) {
    throw MESSAGE.UNEXPECTED_ERROR;
  }
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
