const Savdo_statistikasi = require('../models/Savdo_statistikasi');
const mongoose = require("mongoose");

const getAllSavdoStatistikasi = async (req, res) => {
  try {
    const statistikalar = await Savdo_statistikasi.find(); 
    if (!statistikalar) {
      return res.status(404).send({ error: "Adminlar topilmadi!" }); 
    }
    
    return res.status(200).json(statistikalar);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addSavdoStatistikasi = async (req, res) => {
  const { title, description, image, createdAt } = req.body;
  try {
    const newStatistika = await Savdo_statistikasi.create({
      title,
      description,
      image,
      createdAt,
      updatedAt: createdAt, 
    });

    return res.status(200).json({
      message: 'Savdo statistikasi muvaffaqiyatli qo\'shildi',
      data: newStatistika,
    });
  } catch (err) {
    res.status(500).json({ error: 'Savdo statistikasi qo\'shishda xatolik yuz berdi' });
  }
};

const updateSavdoStatistikasi = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Noto'g'ri car ID." });
        }
    
        const updateData = {};
    
        if (title, description, image) {
            await Car.find({title, description, image, _id: { $ne: id } });
              updateData.title = title; 
              updateData.description = description; 
              updateData.image = image; 
        }
    
    const updatedStatistika = await Savdo_statistikasi.findByIdAndUpdate(id, updateData, { new: true } );

    if (!updatedStatistika) {
      res.status(404).json({ error: 'Savdo statistikasi topilmadi' });
    }

    return res.status(200).json({
      message: 'Savdo statistikasi muvaffaqiyatli yangilandi',
      data: updatedStatistika,
    });
  } catch (err) {
    res.status(500).json({ error: 'Savdo statistikasi yangilashda xatolik yuz berdi' });
  }
};

const deleteSavdoStatistikasi = async (req, res) => {
  const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  try {
    const deletedStatistika = await Savdo_statistikasi.findById(id);

    if (!deletedStatistika) {
      res.status(404).json({ message: 'Savdo statistikasi topilmadi' });
    }

    await Savdo_statistikasi.findByIdAndDelete(id)

    return  res.status(200).json({ message: 'Savdo statistikasi muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Savdo statistikasi o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllSavdoStatistikasi, addSavdoStatistikasi, updateSavdoStatistikasi, deleteSavdoStatistikasi };
