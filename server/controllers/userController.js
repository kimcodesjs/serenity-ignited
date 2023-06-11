const User = require('../models/userModel');
const PractitionerData = require('../models/practitionerDataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Admin / Practitioner
exports.getPractitionerData = catchAsync(async (req, res, next) => {
  const data = await PractitionerData.find(req.user._id);
  data &&
    res.status(201).json({
      status: 'success',
      data,
    });
});
