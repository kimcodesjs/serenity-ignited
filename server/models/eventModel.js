const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for the event.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the event.'],
  },
  slug: String,
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please specify the price for this event.'],
  },
  capacity: {
    max: {
      type: Number,
      required: true,
      default: 7,
    },
    available: {
      type: Number,
      required: true,
      default: 7,
    },
  },
  attendees: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User',
    required: true,
    default: [],
  },
});

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
