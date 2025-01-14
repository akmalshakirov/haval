const Car = require('../models/Car');
const mongoose = require("mongoose");

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

    if(!cars){
      return res.status(404).send({
        error: "Carlar  topilmadi!"
      })
    }
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addCar = async (req, res) => {
  const { model, title, description, year, price, image } = req.body;
  try {
    const car = await Car.create({ model, title, description, year, price, image });
    res.status(200).json({
      message: 'Mashina muvaffaqiyatli qo\'shildi',
      data: car,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Ma\'lumot qo\'shishda xatolik yuz berdi' });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { model, title, description, year, price, image } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri ID." });
    }

    const updateData = {};
 if (model || title || description || year || price || image) {
      const existingCar = await Car.findOne({ 
        model, 
        title, 
        description, 
        year, 
        price, 
        image, 
        _id: { $ne: id } 
      });
      
      if (existingCar) {
        return res.status(400).json({ error: 'Bunday mashina allaqachon mavjud.' });
      }

      updateData.model = model;
      updateData.title = title;
      updateData.description = description;
      updateData.year = year;
      updateData.price = price;
      updateData.image = image;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: "Mashina topilmadi." });
    }

    return res.status(200).json({
      message: 'Mashina ma\'lumotlari yangilandi',
      data: updatedCar,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
};
const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Yaroqsiz ID' });
  }

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: 'Mashina topilmadi' });
    }

   await Car.findByIdAndDelete(id);

    res.status(200).json({ message: 'Mashina muvaffaqiyatli o‘chirildi' });
  } catch (error) {
    console.error("Carni o'chirishda xato:", error);
    res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
  }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
