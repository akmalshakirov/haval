const Category = require('../models/Category');
const mongoose = require("mongoose")

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Kategoriya topilmadi' });
    }

    res.status(200).json(category);

  } catch (error) {
    console.error('Xatolik yuz berdi:',error)
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

const createCategory = async (req, res) => {
  const { name, id } = req.body;
  try {
    const category = await Category.create({ name, id });

    res.status(200).json({ message: 'Kategoriya qo‘shildi!', category });
  } catch (error) {
  console.error('Xatolik yuz berdi', error);
  return res.status(500).json({ error: "Server xatosi yuz berdi." })
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri ID." });
    }

    const updateData = {};

    if (name) {
        await Car.find({ name, _id: { $ne: id } });
          updateData.name = name;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true } );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Kategoriya topilmadi." });
    }
   
      return res.status(200).json({
        message: 'Kategoriya ma\'lumotlari yangilandi',
        data: updatedCategory,
      });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Kategoriya topilmadi' });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Kategoriya o‘chirildi!' });
  } catch (error) {
    console.log(err)
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory }
