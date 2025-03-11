const News = require("../models/News");
const mongoose = require("mongoose");
const { supabase } = require("../config/supabaseClient");
require("dotenv").config();
const storageUrl = process.env.SUPABASE_URL;
const { validationResult } = require("express-validator");

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
    const { title, description } = req.body;

    try {
        console.log(req.body);
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    if (!req.file) {
        return res.status(404).json({ message: "Fayl topilmadi" });
    }

    const bucketName = "Haval";
    const { buffer, originalname } = req.file;
    const fileName = `news/${Date.now()}_${originalname}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, buffer, {
            cacheControl: "3600",
            upsert: false,
            contentType: req.file.mimetype,
        });

    if (uploadError) {
        console.error("Tasvirni yuklashda xato:", uploadError.message);
        return res.status(500).json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
    }

    
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;


        const news = await News.create({
            title,
            description,
            image: imageUrl
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
