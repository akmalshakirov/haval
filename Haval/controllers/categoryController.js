const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = await Category.create({ name, parentId });
    res.status(201).json({ message: 'Kategoriya qo‘shildi!', category });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Kategoriya topilmadi' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Kategoriya topilmadi' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Kategoriya o‘chirildi!' });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error });
  }
};

module.exports = { createCategory, getAllCategories, getCategoryById, deleteCategory }
