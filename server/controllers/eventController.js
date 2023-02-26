const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price,
  });
  res.status(201).json({
    status: 'success',
    data: newEvent,
  });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();
  res.status(201).json({
    status: 'success',
    data: events,
  });
});
