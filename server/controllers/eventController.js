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

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: event,
  });
});

exports.purchaseTicket = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.body.event);

  event.capacity.available === 0 &&
    new AppError('This event is sold out!', '400');

  event.capacity.available = event.capacity.available - 1;
  event.save();
  res.status(201).json({
    status: 'success',
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!event) {
    return next(new AppError('No event found with that id!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
});
