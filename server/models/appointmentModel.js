const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An Appointment must belong to a User.'],
  },
  session: {
    type: mongoose.Schema.ObjectId,
    ref: 'Session',
    required: [
      true,
      'An Appointment must specify the Session to be scheduled.',
    ],
  },
  connection: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
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
