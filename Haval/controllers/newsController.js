const News = require("../models/News");
const mongoose = require("mongoose");
const { newsSchema } = require("../validators/add_news.validate");

const getAllNews = async (req, res) => {
    try {
        const news = await News.find();

        if (!news || news.length === 0) {
            return res.status(404).send({
                error: "Yangiliklar topilmadi!",
            });
        }

        return res.status(200).send({
            message: "Yangiliklar",
            news,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Bazaga ulanishda xatolik yuz berdi" });
    }
};

const addNews = async (req, res) => {
    try {
        const { value, error } = newsSchema.validate(req.body);
       
        const news = await News.create({
            title: value.title,
            description: value.description,
            image: value.image
        });
        

        res.status(200).send({
            message: "Yangilik muvaffaqiyatli qo'shildi",
            news,
        });
    } catch (err) {
        console.error("Saqlashda xatolik yuz berdi:", err);
        res.status(500).json({
            error: "Bazaga yangilik qo'shishda xatolik yuz berdi",
            details: err.message,
        });
    }
};

const updateNews = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Noto'g'ri ID." });
        }

        const { value, error } = newsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updateData = {
            title: value.title,
            description: value.description,
            image: value.image,
            updatedAt: new Date(),
        };

        const updatedNews = await News.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedNews) {
            return res.status(404).json({ error: "Yangilik topilmadi" });
        }

        res.status(200).json({
            message: "Yangilik muvaffaqiyatli yangilandi",
            data: updatedNews,
        });
    } catch (err) {
        res.status(500).json({
            error: "Yangilikni yangilashda xatolik yuz berdi",
        });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Yaroqsiz ID" });
    }

    try {
        const news = await News.findById(id);

        if (!news) {
            return res.status(404).json({ message: "Yangilik topilmadi" });
        }

        await News.findByIdAndDelete(id);

        res.status(200).json({ message: "Yangilik muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({
            error: "Yangilikni o'chirishda xatolik yuz berdi",
        });
    }
};

module.exports = { getAllNews, addNews, updateNews, deleteNews };
