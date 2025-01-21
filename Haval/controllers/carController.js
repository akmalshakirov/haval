const Car = require("../models/Car");
const mongoose = require("mongoose");
const { supabase } = require("../config/supabaseClient");

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

        if (!cars) {
            return res.status(404).send({
                error: "Carlar  topilmadi!",
            });
        }
    } catch (err) {
        res.status(500).json({ error: "Bazaga ulanishda xatolik yuz berdi" });
    }
};

const addCar = async (req, res) => {
    const { model, title, description, year, price } = req.body;

    try {
        if (!req.file) {
            console.log(req.file);
            return res.status(404).json({
                message: "Fayl topilmadi",
            });
        }
        const bucketName = "Haval";
        const { buffer, originalname } = req.file;
        const fileName = `${Date.now()}_${originalname}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, buffer, {
                casheControl: "3600",
                upsert: false,
                contentType: req.file.mimetype,
            });

        if (uploadError) {
            console.error("Tasvirni yuklashda xato:", uploadError.message);
            return res
                .status(500)
                .json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
        }

        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        const imageUrl = publicUrlData.publicUrl;

        const carData = {
            model,
            title,
            description,
            year,
            price,
            image: imageUrl,
        };

        const result = await CarModel.create(carData);

        res.status(200).json({
            message: "Mashina muvaffaqiyatli qo'shildi",
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ichki server xatosi yuz berdi." });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { model, title, description, year, price } = req.body;

    try {
        let imageUrl;

        if (req.file) {
            const bucketName = "Haval";
            const fileName = `${Date.now()}_${req.file.originalname}`;

            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from(bucketName)
                    .upload(fileName, req.file.buffer, {
                        contentType: req.file.mimetype,
                    });

            if (uploadError) {
                console.error("Tasvirni yuklashda xato:", uploadError.message);
                return res
                    .status(500)
                    .json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
            }

            const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        }

        const updateData = { model, title, description, year, price };
        if (imageUrl) updateData.image = imageUrl;

        const result = await CarModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!result) {
            return res.status(404).json({ error: "Mashina topilmadi." });
        }

        res.status(200).json({
            message: "Mashina ma'lumotlari yangilandi",
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ichki server xatosi yuz berdi." });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Yaroqsiz ID" });
    }

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ error: "Mashina topilmadi" });
        }

        await Car.findByIdAndDelete(id);

        res.status(200).json({ message: "Mashina muvaffaqiyatli o‘chirildi" });
    } catch (error) {
        console.error("Carni o'chirishda xato:", error);
        res.status(500).json({ error: "Serverda xatolik yuz berdi" });
    }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
