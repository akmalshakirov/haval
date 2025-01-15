const Car = require('../models/Car');
const mongoose = require("mongoose");
const supabase = require('../config/supabaseClient');

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
   
    const { data, error } = await supabase
      .from('cars') 
      .insert([{ model, title, description, year, price, image }]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Ma\'lumot qo\'shishda xatolik yuz berdi.' });
    }

    res.status(200).json({
      message: 'Mashina muvaffaqiyatli qo\'shildi',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ichki server xatosi yuz berdi.' });
  }
};


const updateCar = async (req, res) => {
  const { id } = req.params;
  const { model, title, description, year, price } = req.body;

  const image = req.file ? req.file.buffer.toString('base64') : null;

  try {
    const { data: existingCar, error: checkError } = await supabase
      .from('cars')
      .select('*')
      .eq('model', model)
      .eq('title', title)
      .eq('description', description)
      .eq('year', year)
      .eq('price', price)
      .neq('id', id) 
      .single();

    if (checkError) {
      console.log(checkError);
      return res.status(500).json({ error: 'Ma\'lumotni tekshirishda xatolik yuz berdi.' });
    }

    if (existingCar) {
      return res.status(400).json({ error: 'Bunday mashina allaqachon mavjud.' });
    }

    const updateData = { model, title, description, year, price };
    if (image) updateData.image = image;

    const { data, error } = await supabase
      .from('cars')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi.' });
    }

    if (!data.length) {
      return res.status(404).json({ error: 'Mashina topilmadi.' });
    }

    res.status(200).json({
      message: 'Mashina ma\'lumotlari yangilandi',
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ichki server xatosi yuz berdi.' });
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
}

module.exports = { getCars, addCar, updateCar, deleteCar };
