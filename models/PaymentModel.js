const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
