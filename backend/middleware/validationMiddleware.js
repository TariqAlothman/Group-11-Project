const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    message: 'Validation failed',
    errors: errors.array().map(({ path, msg, value }) => ({
      field: path,
      message: msg,
      value,
    })),
  });
};

module.exports = { handleValidationErrors };
