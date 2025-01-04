const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      
      if (users.length === 0) {
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
  
  exports.deleteUser = async (req, res) => {
    const { usersId } = req.params;  
    try {
      const userId = req.cookies.userId;  

      const user = await User.findById(usersId);
      if (!user) {
        return res.status(404).send({ error: "Foydalanuvchi topilmadi!" });
      }
  
      if (user._id.toString() !== userId) {
        return res.status(403).send({ error: "Siz bu foydalanuvchini o'chirishga ruxsatga ega emassiz!" });
      }
  
      await User.findByIdAndDelete(usersId);
  
      return res.status(200).send("Foydalanuvchi muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error('Foydalanuvchini o\'chirishda xato:', error);
      res.status(500).send('Server xatosi');
    }
  };
  