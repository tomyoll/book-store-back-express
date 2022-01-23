const { STATUS: { SUCCESS, FAIL } } = require('../constants');

const successMessage = (message) => ({
  status: SUCCESS,
  message,
});

const failMessage = (errors) => ({
  status: FAIL,
  errors,
});

module.exports = {
  successMessage,
  failMessage,
};
