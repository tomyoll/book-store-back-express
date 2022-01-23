const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userModel = require('../models/User');
const wishListModel = require('../models/WishList');
const tokenModel = require('../models/Token');
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const { MESSAGE } = require('../constants');

const registration = async (email, password, role) => {
  const candidate = await userModel.findOne({ email });
  if (candidate) {
    return MESSAGE.EMAIL_IS_TAKEN;
  }
  const hashPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);
  const activationLink = uuid.v4();

  const user = await userModel.create({
    email, password: hashPassword, activationLink, role,
  });
  await wishListModel.create({ user: user._id });
  await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

  const payload = {
    email: user.email, id: user._id, isActivated: user.isActivated, role,
  };
  const tokens = tokenService.generateTokens(payload);
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const activate = async (activationLink) => {
  const user = await userModel.findOne({ activationLink });
  if (!user) {
    throw MESSAGE.INVALID_ACTIVATION_LINK;
  }
  user.isActivated = true;
  await user.save();
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    return {
      error: MESSAGE.USER_NOT_EXIST,
    };
  }
  const isPasswordsEquals = await bcrypt.compareSync(password, user.password);
  if (!isPasswordsEquals) {
    return {
      error: MESSAGE.WRONG_PASSWORD,
    };
  }
  const payload = {
    email: user.email, _id: user._id, isActivated: user.isActivated, role: user.role,
  };
  const tokens = tokenService.generateTokens(payload);
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

const logout = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw MESSAGE.USER_UNAUTHORIZED;
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw MESSAGE.USER_UNAUTHORIZED;
  }
  const user = await userModel.findById(userData._id);
  const payload = {
    email: user.email, _id: user._id, isActivated: user.isActivated, role: user.role,
  };
  const tokens = tokenService.generateTokens(payload);
  await tokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: payload,
  };
};

module.exports = {
  registration,
  activate,
  login,
  logout,
  refresh,
};
