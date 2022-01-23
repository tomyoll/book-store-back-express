const checkValidation = require('../utils/CheckValidation');
const userService = require('../services/UserService');
const { MESSAGE, ROLES } = require('../constants');
const { successMessage, failMessage } = require('../utils/ApiMessage');

const registration = async (req, res) => {
  try {
    const validationErrors = checkValidation(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(failMessage(validationErrors));
    }
    const { email, password, role = ROLES.USER } = req.body;
    const userData = await userService.registration(email, password, role);
    if (userData === MESSAGE.EMAIL_IS_TAKEN) {
      return res.status(400).json(failMessage([MESSAGE.EMAIL_IS_TAKEN]));
    }
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(successMessage(userData));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    if (userData.error) {
      return res.status(404).json(failMessage([userData.error]));
    }
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(successMessage(userData));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (err) {
    return res.json(failMessage(MESSAGE.UNEXPECTED_ERROR));
  }
};

const activate = async (req, res) => {
  try {
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (err) {
    return res.json(failMessage([err.message]));
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.json(successMessage(userData));
  } catch (err) {
    return res.status(400).json(failMessage([err.message]));
  }
};

module.exports = {
  registration,
  login,
  logout,
  activate,
  refresh,
};
