const mongoose = require('mongoose');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      
      if (!users) {
        return res.status(404).send({
          error: "Userlar topilmadi!"
        });
      }
  
      return res.status(200).send(users);
  
    } catch (error) {
      console.error('Userlarni olishda xato:', error);
      res.status(500).send('Server xatosi');
    }
  };
  
exports.getUserById = async (req, res) => {
  const { id } = req.params;  

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User topilmadi!" });  
    }

    return res.status(200).send(user);  

  } catch (error) {
    console.error('Userni olishda xato:', error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;  

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Yaroqsiz ID' });
      }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: "Foydalanuvchi topilmadi!" });
      }
  
      await User.findByIdAndDelete(id);
  
      return res.status(200).send("Foydalanuvchi muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error('Foydalanuvchini o\'chirishda xato:', error);
      res.status(500).send('Server xatosi');
    }
  };
  