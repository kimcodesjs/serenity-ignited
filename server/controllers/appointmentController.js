const catchAsync = require('../utils/catchAsync');
const Appointment = require('../models/appointmentModel');
const { DateTime } = require('luxon');
const Email = require('../utils/email');

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
  new Email(req.user).sendAppointmentConfirm(newAppointment);
  next();
});

exports.getUserAppointments = catchAsync(async (req, res, next) => {
  const results = await Appointment.find({ user: req.user._id });
  const futureAppointments = results.filter((appointment) => {
    let currentDate = DateTime.now().valueOf();
    let appointmentDate = DateTime.fromISO(appointment.date).valueOf();
    if (currentDate < appointmentDate) return appointment;
  });
  res.status(201).json({
    status: 'success',
    data: futureAppointments,
  });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();

  // filter for future appointments only
  const futureAppointments = appointments.filter((appointment) => {
    let currentDate = DateTime.now().valueOf();
    let appointmentDate = DateTime.fromISO(appointment.date).valueOf();
    if (currentDate < appointmentDate) return appointment;
  });

  res.status(201).json({
    status: 'success',
    data: futureAppointments,
  });
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOneAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!appointment) {
    return next(new AppError('No appointment found with that id!'));
  }
  res.status(200).json({
    status: 'success',
    data: appointment,
  });
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) {
    return next(new AppError('No appointment found with that id!', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
