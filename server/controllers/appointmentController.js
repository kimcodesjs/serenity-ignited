const catchAsync = require('../utils/catchAsync');
const Appointment = require('../models/appointmentModel');

exports.createAppointment = catchAsync(async (req, res, next) => {
  const newAppointment = await Appointment.create({
    user: req.body.user,
    session: req.body.session,
    connection: req.body.connection,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
    paid: true,
  });
  res.status(201).json({
    status: 'success',
    data: newAppointment,
  });
});

exports.getUserAppointments = catchAsync(async (req, res, next) => {
  const results = await Appointment.find({ user: req.user._id });
  console.log(results);
  res.status(201).json({
    status: 'success',
    data: results,
  });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(201).json({
    status: 'success',
    data: appointments,
  });
});
