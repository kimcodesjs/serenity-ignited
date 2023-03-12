const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please provide a name for the event.'],
  },
  description: {
    type: String,
    require: [true, 'Please provide a description for the event.'],
  },
  start: {
    type: String,
    require: true,
  },
  end: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: [true, 'Please specify the price for this event.'],
  },
  capacity: {
    max: {
      type: Number,
      require: true,
      default: 7,
    },
    available: {
      type: Number,
      require: true,
      default: 7,
    },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
