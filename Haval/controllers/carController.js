const Car = require('../models/Car');

const getCars = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const cars = await Car.find().skip(skip).limit(limit); 
    const total = await Car.countDocuments(); 

    res.json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      cars,
    });
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addCar = async (req, res) => {
  const { model, title, description, year, price, image } = req.body;
  try {
    const car = await Car.create({ model, title, description, year, price, image });
    res.status(201).json({
      message: 'Mashina muvaffaqiyatli qo\'shildi',
      data: car,
    });
  } catch (err) {
    res.status(500).json({ error: 'Ma\'lumot qo\'shishda xatolik yuz berdi' });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { model, title, description, year, price, image } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      id,
      { model, title, description, year, price, image },
      { new: true } 
    );

    if (car) {
      res.status(200).json({
        message: 'Mashina ma\'lumotlari yangilandi',
        data: car,
      });
    } else {
      res.status(404).json({ error: 'Mashina topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);

    if (car) {
      res.status(200).json({ message: 'Mashina muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Mashina topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ma\'lumotni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
