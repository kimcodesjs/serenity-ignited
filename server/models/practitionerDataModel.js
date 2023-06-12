const mongoose = require('mongoose');

const practitionerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  blockedDays: {
    type: [String],
    enum: {
      values: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    default: [],
  },
  blockedDates: {
    type: [String],
    default: [],
  },
  workingHours: {
    weekday: {
      start: {
        hour: {
          type: Number,
          required: true,
          default: 18,
        },
        minute: {
          type: Number,
          required: true,
          default: 30,
        },
      },
      end: {
        hour: {
          type: Number,
          required: true,
          default: 21,
        },
        minute: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
    weekend: {
      start: {
        hour: {
          type: Number,
          required: true,
          default: 10,
        },
        minute: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      end: {
        hour: {
          type: Number,
          required: true,
          default: 20,
        },
        minute: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
  },
});

const PractitionerData = mongoose.model('Practitioner', practitionerSchema);

module.exports = PractitionerData;
