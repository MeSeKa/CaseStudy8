// models/PromotionCode.js
const mongoose = require('mongoose');

const promotionCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountValue: { type: Number, required: true },
  expirationDate: { type: Date, required: true }
});

module.exports = mongoose.model('PromotionCode', promotionCodeSchema);
