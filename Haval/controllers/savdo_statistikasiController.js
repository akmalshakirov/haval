const Savdo_statistikasi = require('../models/Savdo_statistikasi');


const getAllSavdoStatistikasi = async (req, res) => {
  try {
    const statistikalar = await Savdo_statistikasi.find(); 
    res.status(200).json(statistikalar);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};


const addSavdoStatistikasi = async (req, res) => {
  const { title, description, image, createdAt } = req.body;
  try {
    const newStatistika = new Savdo_statistikasi({
      title,
      description,
      image,
      createdAt,
      updatedAt: createdAt, 
    });

    await newStatistika.save();
    res.status(201).json({
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
    const updatedStatistika = await Savdo_statistikasi.findByIdAndUpdate(
      id,
      { title, description, image, updatedAt: new Date().toISOString() }, 
      { new: true } 
    );

    if (updatedStatistika) {
      res.status(200).json({
        message: 'Savdo statistikasi muvaffaqiyatli yangilandi',
        data: updatedStatistika,
      });
    } else {
      res.status(404).json({ error: 'Savdo statistikasi topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Savdo statistikasi yangilashda xatolik yuz berdi' });
  }
};


const deleteSavdoStatistikasi = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStatistika = await Savdo_statistikasi.findByIdAndDelete(id);

    if (deletedStatistika) {
      res.status(200).json({ message: 'Savdo statistikasi muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Savdo statistikasi topilmadi' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Savdo statistikasi o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllSavdoStatistikasi, addSavdoStatistikasi, updateSavdoStatistikasi, deleteSavdoStatistikasi };
