const PractitionerData = require('../models/practitionerDataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Admin / Practitioner
exports.getPractitionerData = catchAsync(async (req, res, next) => {
  const data = await PractitionerData.findById(req.params.id);
  data &&
    res.status(200).json({
      status: 'success',
      data,
    });
});

exports.postPractitionerData = catchAsync(async (req, res, next) => {
  const existing = await PractitionerData.find({
    user: req.user._id,
  });
  if (existing.length !== 0)
    return next(
      new AppError('This user has existing data, please update instead!', 400)
    );
  const newPractitionerData = await PractitionerData.create({
    user: req.user._id,
    blockedDates: req.body.blockedDates,
    blockedDays: req.body.blockedDays,
    workingHours: req.body.workingHours,
  });
  res.status(200).json({
    status: 'success',
    data: newPractitionerData,
  });
});

exports.updatePractitionerData = catchAsync(async (req, res, next) => {
  const updatedData = await PractitionerData.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedData)
    return next(new AppError('No practitioner data found with that id!', 404));
  res.status(200).json({
    status: 'success',
    data: updatedData,
  });
});
