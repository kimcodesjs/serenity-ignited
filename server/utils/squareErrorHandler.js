const AppError = require('./appError');

exports.formatError = (err) => {
  return new AppError(`${err.errors[0].code}`, 400);
};
