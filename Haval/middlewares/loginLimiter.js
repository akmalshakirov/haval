const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 daqiqa
    max: 15, // Har bir IP uchun 5 ta urinish

    handler: (req, res ,next) => {
      // Rate limitdan oshib ketganda xato sahifasiga yo'naltirish
      res.status(429).render('429', {
        message: "Siz juda ko'p urinish qildingiz. Iltimos, 5 daqiqadan so'ng urinib ko'ring!."
      });
      next ()
    }
  });


