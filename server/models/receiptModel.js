const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Please specify who this receipt belongs to.'],
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: Number,
  category: {
    type: String,
    require: true,
    enum: ['event', 'appointment'],
  },
  timestamps: true,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
