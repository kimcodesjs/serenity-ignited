const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create({
    name: req.body.name,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    price: req.body.price,
    capacity: {
      max: req.body.capacity,
    },
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
