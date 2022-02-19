const mongoose = require('mongoose');

const fields = {
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '',
  },
};
const references = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
};

const productSchema = new mongoose.Schema(Object.assign(fields, references), {
  timestamps: true,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
