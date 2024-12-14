const News = require('../models/News');
const jwt = require('jsonwebtoken');

const getAllNews = async (req, res) => {
  try {
    const token = req.cookies.token;
    const news = await News.find().sort({ createdAt: -1 }).limit(50).populate("author", "username");
    const item = await News.find().sort({ createdAt: -1 }).limit(4).populate("author", "username");

    if (req.cookies.token) {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = req.cookies.userId;

      if (user.roles === "ADMIN") {
        return res.render("index", {
          news,
          item,
          user,
          token,
          userId,
          isAdmin: true,
        });
      } else if (user.roles === "USER") {
        return res.render("index", {
          news,
          item,
          token,
          user,
          userId,
        });
      }
    } else {
      return res.render("index", {
        news,
        item,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Database error' });
  }
};

const addNews = async (req, res) => {
  const { title, description, image, createdAt } = req.body;
  try {
    const news = await News.create({
      title,
      description,
      image,
      createdAt,
      updatedAt: createdAt, 
    });
    res.status(201).json({
      message: 'Yangilik muvaffaqiyatli qo\'shildi',
      data: news,
    });
  } catch (err) {
    res.status(500).json({ error: 'Bazaga yangilik qo\'shishda xatolik yuz berdi' });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
    const news = await News.findByIdAndUpdate(
      id,
      { title, description, image, updatedAt: new Date() },
      { new: true } 
    );

    if (news) {
      res.status(200).json({
        message: 'Yangilik muvaffaqiyatli yangilandi',
        data: news,
      });
    } else {
      res.status(404).json({ error: 'Yangilik topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Yangilikni yangilashda xatolik yuz berdi' });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByIdAndDelete(id);

    if (news) {
      res.status(200).json({ message: 'Yangilik muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Yangilik topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Yangilikni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllNews, addNews, updateNews, deleteNews };
