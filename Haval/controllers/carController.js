const { Car } = require("../models/Car");
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
        const fileName = `cars/${Date.now()}_${originalname}`;

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
            // title,
            // description,
            year,
            price,
            image: imageUrl,
        };

        const result = await Car.create(carData);

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
    const id = req.params.id;
    const { model, year, price } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Fayl topilmadi. Iltimos, tasvirni yuklang.",
            });
        }

        const bucketName = "Haval";
        const { buffer, originalname } = req.file;
        const fileName = `cars/${Date.now()}_${originalname}`;

        const existingCar = await Car.findById(id);
        if (!existingCar) {
            return res.status(404).json({ message: "Mashina topilmadi." });
        }
        const oldImagePath = existingCar.image
            ? existingCar.image.split("/").pop()
            : null;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, buffer, {
                cacheControl: "3600",
                upsert: false,
                contentType: req.file.mimetype,
            });

        if (uploadError) {
            console.error("Tasvirni yuklashda xato:", uploadError.message);
            return res.status(500).json({
                error: "Tasvirni yuklashda xatolik yuz berdi.",
            });
        }

        const { data: publicUrlData, error: publicUrlError } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        if (publicUrlError || !publicUrlData) {
            console.error(
                "Tasvir URL-ni olishda xato:",
                publicUrlError.message
            );
            return res.status(500).json({
                error: "Tasvir URL-ni olishda xatolik yuz berdi.",
            });
        }

        const imageUrl = publicUrlData.publicUrl;

        if (oldImagePath) {
            const { error: removeError } = await supabase.storage
                .from(bucketName)
                .remove([oldImagePath]);

            if (removeError) {
                console.error(
                    "Eski tasvirni o'chirishda xato:",
                    removeError.message
                );
            }
        }

        const updateData = { model, year, price, image: imageUrl };

        await Car.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({
            message: "Mashina ma'lumotlari muvaffaqiyatli yangilandi.",
            data: updateData,
        });
    } catch (err) {
        console.error("Server xatosi:", err);
        res.status(500).json({ error: "Ichki server xatosi yuz berdi." });
    }
};

const deleteCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findOne({ _id: carId });

        if (!car) {
            return res.status(404).json({ message: "Mashina topilmadi" });
        }

        if (car.imagePath) {
            const { error: deleteError } = await supabase.storage
                .from("Haval")
                .remove([car.imagePath]);

            if (deleteError) {
                console.error(
                    "Supabase rasmni o'chirishda xatolik:",
                    deleteError.message
                );
                return res
                    .status(500)
                    .json({ message: "Rasmni o'chirishda xatolik yuz berdi." });
            }
        }

        const deleteResult = await Car.deleteOne({ _id: carId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Mashina o'chirilmadi" });
        }

        res.status(200).json({ message: "Mashina muvaffaqiyatli o'chirildi" });
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
