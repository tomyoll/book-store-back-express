const { validationResult } = require('express-validator');

module.exports = (req) => {
  const errors = validationResult(req);
  const errorValues = [];
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => errorValues.push(error.msg));
  }
  return errorValues;
};
