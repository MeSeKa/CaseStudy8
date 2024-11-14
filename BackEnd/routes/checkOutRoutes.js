// routes/checkoutRoutes.js
const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Sepet bulunamadı' });

    const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) - cart.discount;

    // Stripe olmadan geçici bir yanıt döndürme
    res.json({ message: 'Ödeme işlemi başlatıldı. Toplam Tutar: $' + totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Ödeme işlemi sırasında hata oluştu' });
  }
});

module.exports = router;
