const News = require("../models/News");
const mongoose = require("mongoose");
const { supabase } = require("../config/supabaseClient");
require("dotenv").config();
const storageUrl = process.env.SUPABASE_URL;

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
    // try {
    //         console.log("Kelgan ma'lumot:", req.body); // Req.body ni tekshiramiz

    //         const { value, error } = newsSchema.validate(req.body);
    //         if (error) {
    //             console.log("Validatsiya xatosi:", error.details[0].message);
    //             return res.status(400).json({ error: error.details[0].message });
    //         }

    //         console.log("Validatsiyadan o‘tdi, saqlash boshlandi...");

    //         const news = await News.create({
    //             title: value.title,
    //             description: value.description,
    //             image: value.image,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //         });

    //         console.log("Bazaga muvaffaqiyatli saqlandi:", news);

    const { title, description, image } = req.body;

    function formatDate(date) {
        const d = new Date(date);
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = String(d.getFullYear()).slice(-2);
        return `${day}/${month}/${year}, ${hours}:${String(minutes).padStart(
            2,
            "0"
        )}`;
    }

    try {
        const { value, error } = newsSchema.validate(req.body);
        console.log(req.body);

        const news = await News.create({
            title: value.title,
            description: value.description,
            image,
            createdAt: formatDate(new Date()),
            updatedAt: formatDate(new Date()),
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
        const { title, description } = require(req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const existingCar = await Car.findById(id);
        if (!existingCar) {
            return res.status(404).json({ message: "Mashina topilmadi." });
        }

        let imageUrl = existingCar.image;

        if (req.file) {
            const bucketName = "Haval";
            const { buffer, originalname, mimetype } = req.file;
            const fileName = `news/${Date.now()}_${originalname}`;

            if (existingCar.image) {
                const oldImagePath = existingCar.image.replace(
                    `${storageUrl}/object/public/Haval/`,
                    ""
                );

                console.log(oldImagePath);
                const { error: removeError } = await supabase.storage
                    .from(bucketName)
                    .remove([oldImagePath]);

                if (removeError) {
                    console.error(
                        "❌ Eski tasvirni o‘chirishda xato:",
                        removeError.message
                    );
                    return res.status(500).json({
                        error: "Eski tasvirni o‘chirishda xatolik yuz berdi.",
                    });
                }
            }

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, buffer, {
                    cacheControl: "3600",
                    upsert: true,
                    contentType: mimetype,
                });

            if (uploadError) {
                console.error(
                    "❌ Tasvirni yuklashda xato:",
                    uploadError.message
                );
                return res
                    .status(500)
                    .json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
            }

            const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        }

        const updateData = {
            title,
            description,
            image: imageUrl,
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
