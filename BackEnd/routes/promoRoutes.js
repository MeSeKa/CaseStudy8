// routes/promoRoutes.js
const express = require('express');
const PromotionCode = require('../models/PromotionCode');

const router = express.Router();

router.post('/apply-promo', async (req, res) => {
  const { code } = req.body;

  try {
    const promo = await PromotionCode.findOne({ code, expirationDate: { $gte: new Date() } });
    if (promo) {
      res.json({ discount: promo.discountValue });
    } else {
      res.status(400).json({ message: 'Geçersiz veya süresi dolmuş promosyon kodu' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Promosyon kodu doğrulanırken hata oluştu' });
  }
});

module.exports = router;
