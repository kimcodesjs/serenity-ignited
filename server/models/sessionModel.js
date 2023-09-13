const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the session.'],
  },
  modality: {
    type: [String],
    required: [true, 'Please specify the session modality.'],
    enum: {
      values: ['Reiki', 'Access Consciousness', 'Sound Healing'],
    },
  },
  description: {
    type: String,
    required: [true, 'Please describe this session.'],
  },
  duration: {
    hours: {
      type: Number,
      required: [true, 'Please specify the duration: hours.'],
    },
    minutes: {
      type: Number,
      required: [true, 'Please specify the duration: minutes.'],
    },
  },
  price: {
    type: Number,
    required: [true, 'Please specify the price for this session.'],
  },
  inPersonOnly: {
    type: Boolean,
    default: false,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
