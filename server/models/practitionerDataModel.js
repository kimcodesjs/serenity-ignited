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
        hours: {
          type: Number,
          required: true,
          default: 18,
        },
        minutes: {
          type: Number,
          required: true,
          default: 30,
        },
      },
      end: {
        hours: {
          type: Number,
          required: true,
          default: 21,
        },
        minutes: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
    weekend: {
      start: {
        hours: {
          type: Number,
          required: true,
          default: 10,
        },
        minutes: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      end: {
        hours: {
          type: Number,
          required: true,
          default: 20,
        },
        minutes: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
  },
});

const PractitionerData = mongoose.model('Practitioner', practitionerSchema);
