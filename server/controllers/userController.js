const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.submitContactForm = catchAsync(async (req, res, next) => {
  new Email().notifyAdminContactSubmission(
    req.body.name,
    req.body.email,
    req.body.body
  );

  res.status(204).json({
    status: 'success',
  });
});
