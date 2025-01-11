const News = require('../models/News');
const mongoose = require("mongoose");

const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
        
        if(!news){
          return res.status(404).send({
            error: "Yangiliklar  topilmadi!"
          })
        }
    
        return res.status(200).send(news)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addNews = async (req, res) => {
  const { title, description, image } = req.body;

  function formatDate(date) {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}, ${hours}:${String(minutes).padStart(2, "0")}`;
  }

  try {
    const news = await News.create({
      title,
      description,
      image,
      createdAt: formatDate(new Date()), 
      updatedAt: formatDate(new Date()), 
    });

    res.status(200).json({
      message: 'Yangilik muvaffaqiyatli qo\'shildi',
      data: news,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Bazaga yangilik qo\'shishda xatolik yuz berdi' });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  try {
 if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri car ID." });
    }

    const updateData = {};

    if (title, description, image) {
        await News.find({ title, description, image, _id: { $ne: id } });
          updateData.title = title; 
          updateData.description = description; 
          updateData.image = image; 
    }

    const updatedNews = await News.findByIdAndUpdate( id,updateData, { new: true });

    if (!updatedNews) {
      res.status(404).json({ error: 'Yangilik topilmadi' });
    }

    res.status(200).json({
      message: 'Yangilik muvaffaqiyatli yangilandi',
      data: news,
    });
  } catch (err) {
    res.status(500).json({ error: 'Yangilikni yangilashda xatolik yuz berdi' });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  
  try {
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: 'Yangilik topilmadi' });
    }

    await News.findByIdAndDelete(id);

    res.status(200).json({ message: 'Yangilik muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Yangilikni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllNews, addNews, updateNews, deleteNews };
