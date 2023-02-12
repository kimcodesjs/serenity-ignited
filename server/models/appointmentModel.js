const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'An Appointment must belong to a User.'],
  },
  session: {
    type: mongoose.Schema.ObjectId,
    ref: 'Session',
    require: [true, 'An Appointment must specify the Session to be scheduled.'],
  },
  connection: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

appointmentSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'session',
    select: ['name', 'modality', 'price'],
  });
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
