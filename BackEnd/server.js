// Gerekli modülleri ve çevre değişkenlerini içe aktar
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS paketini ekliyoruz



// Çevre değişkenlerini yapılandır
dotenv.config();

// Express uygulamasını başlatın
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8081' // Frontend URL'sini belirtin
}));


// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((error) => console.error('MongoDB bağlantı hatası:', error));

// Route modüllerini içe aktar
const cartRoutes = require('./routes/cartRoutes');
const promoRoutes = require('./routes/promoRoutes');
const checkoutRoutes = require('./routes/checkOutRoutes');

// API route'larını kullanıma aç
app.use('/api', cartRoutes);
app.use('/api', promoRoutes);
app.use('/api', checkoutRoutes);

// Dinleme Portu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} üzerinde çalışıyor.`);
});
