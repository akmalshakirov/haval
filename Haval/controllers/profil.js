const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const User = require('../models/User');

exports.Profil = async (req, res) => {
    try {
        const { id } = req.params;  
      const user = await User.findById(id).populate("orders")
  
      if (!user) {
        return res.status(404).send({ error: "User topilmadi!" });  
      }
      return res.status(200).send(user);  
  
    } catch (error) {
      console.error('Userni olishda xato:', error);
      return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
  };

exports.updatedProfil = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ error: "User topilmadi." });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, password } = req.body;
        const updateData = { name, email };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ message: "Profil muvaffaqiyatli yangilandi", data: updatedUser });
    } catch (error) {
        console.error("Profilni yangilashda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
}