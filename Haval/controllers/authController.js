const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, email, password, role } = req.body;
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: "Bu email bilan foydalanuvchi allaqachon mavjud",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Barcha maydonlarni to‘ldiring." });
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET muhit o'zgaruvchisi mavjud emas!");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
        console.log(token)
        res.status(200).json({
            message: "Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi.",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverda xatolik yuz berdi." });
    }
};

exports.login = async (req, res) => {
    try {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Noto‘g‘ri parol' });
  
      const token = jwt.sign(
        { 
            id: user._id, 
            email: user.email,
            name: user.name,
            role: user.role 
        }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1d' });

    return res.status(200).send({
            token,
    });
    } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
    }
  };


exports.loginAdmin = async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email: email });
        console.log(admin);

        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                adminName: admin.adminName,
                role: admin.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res.status(200).send({
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};
