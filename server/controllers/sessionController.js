const catchAsync = require('../utils/catchAsync');
const Session = require('../models/sessionModel');

exports.getAllSessions = catchAsync(async (req, res, next) => {
  const sessions = await Session.find();

  res.status(200).json({
    status: 'success',
    results: sessions.length,
    data: sessions,
  });
});

exports.createNewSession = catchAsync(async (req, res, next) => {
  const newSession = await Session.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newSession,
    },
  });
});
