// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [cartItemSchema],
  discount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);
