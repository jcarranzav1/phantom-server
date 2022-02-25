const mongoose = require('mongoose');

const fields = {
  idPayment: {
    type: String,
    require: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  billingAddress: {
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    line1: {
      type: String,
      default: '',
    },
  },
  /*  city: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
    required: true,
  },
  postalCode: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
    required: true,
  }, */
  /* address: { type: Object, required: true }, */
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
