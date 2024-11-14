// routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

router.get('/cart', async (req, res) => {
  const userId = 'user123'; // Geçici userId değeri

  try {
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Sepet bulunamadı' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sepet getirilirken hata oluştu' });
  }
});

module.exports = router;
