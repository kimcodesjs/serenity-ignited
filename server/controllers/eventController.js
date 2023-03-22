const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');
const { DateTime } = require('luxon');

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create({
    category: req.body.category,
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
  const events = await Event.find(req.query);
  const futureEvents = events.filter((event) => {
    let currentDate = DateTime.now().valueOf();
    let eventDate = DateTime.fromISO(event.start).valueOf();
    if (currentDate < eventDate) return event;
  });
  res.status(201).json({
    status: 'success',
    data: futureEvents,
  });
});
