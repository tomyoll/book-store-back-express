const tokenService = require('../services/TokenService');
const { MESSAGE } = require('../constants');
const { failMessage } = require('../utils/ApiMessage');

module.exports = (role) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      console.log('authorizationHeader');
      return res.status(401).json(failMessage([MESSAGE.USER_UNAUTHORIZED]));
    }

    const accessToken = authorizationHeader.split(' ')[1]; // Bearer accessToken
    if (!accessToken) {
      console.log('accessToken');
      return res.status(401).json(failMessage([MESSAGE.USER_UNAUTHORIZED]));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (userData.role !== role) {
      return res.status(403).json(failMessage([MESSAGE.USER_FORBIDDEN]));
    }

    req.user = userData;
    next();
  } catch (err) {
    return res.status(500).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};
