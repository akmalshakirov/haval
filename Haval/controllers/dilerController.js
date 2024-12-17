const Diler = require('../models/Diler');

// Dilerlarni olish
const getDiler = async (req, res) => {
  try {
    const dilers = await Diler.find(); 
    res.json(dilers);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};


// Yangi Diler qo'shish
const addDiler = async (req, res) => {
  const { dilerId, title, manzil, workHours, phone } = req.body;
  try {
    const newDiler = new Diler({
      dilerId,
      title,
      manzil,
      workHours,
      phone,
    });
    await newDiler.save(); 
    res.status(201).json({ message: 'Ma\'lumotlar muvaffaqiyatli yuborildi:', data: newDiler });
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ma\'lumot qo\'shishda xatolik yuz berdi' });
  }
};

const updateDiler = async (req, res) => {
  const { id } = req.params;
  const { dilerId, title, manzil, workHours, phone } = req.body;
  try {
    const diler = await Diler.findByIdAndUpdate(
      id,
      { dilerId, title, manzil, workHours, phone},
      { new: true } 
    );

    if (diler) {
      res.status(200).json({
        message: 'Diler ma\'lumotlari yangilandi',
        data: diler,
      });
    } else {
      res.status(404).json({ error: 'Diler topilmadi' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
}

// Dilerni o'chirish
const deleteDiler = async (req, res) => {
  const { id } = req.params; 
  try {
    const deleted = await Diler.findByIdAndDelete(id); 
    if (deleted) {
      res.status(200).json({ message: 'Diler muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Diler topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ma\'lumotni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getDiler, addDiler, updateDiler, deleteDiler };
