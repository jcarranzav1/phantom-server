const mongoose = require('mongoose');

const fields = {
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
};

const references = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
};

const orderSchema = new mongoose.Schema(Object.assign(fields, references), {
  timestamps: true,
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
