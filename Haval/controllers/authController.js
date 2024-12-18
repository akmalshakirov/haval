const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();  


const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Noto'g'ri email formati" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Bu email bilan foydalanuvchi allaqachon mavjud" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET muhit o\'zgaruvchisi mavjud emas!');
    }

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,  
      { expiresIn: '1h' } 
    );
    res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi', token });

  } catch (error) {
    console.error('Ro\'yxatdan o\'tishda xato:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register }
