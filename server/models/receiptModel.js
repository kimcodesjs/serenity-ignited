const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please specify who this receipt belongs to.'],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: Number,
  category: {
    type: String,
    required: true,
    enum: ['event', 'appointment'],
  },
  timestamps: true,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
