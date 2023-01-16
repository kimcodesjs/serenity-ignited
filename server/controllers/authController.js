const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};
if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  newUser.password = undefined;

  const token = signToken(newUser._id);
  res.cookie('jwt', token, cookieOptions);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and pasword.', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.validatePasswordInput(password, user.password))) {
    return next(new AppError('Email or password was incorrect...', 401));
  }
  user.password = undefined;
  const token = signToken(user._id);
  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('User not found...', 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(err);
  }
});

exports.resetPassword = (req, res, next) => {};
