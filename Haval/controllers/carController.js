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
    const carId = req.params.id;
    const { model, year, price, image } = req.body;

    try {
        const car = await Car.findOne({ _id: carId });

        if (!car) {
            return res.status(404).json({ message: "Mashina topilmadi" });
        }

        if (!req.file) {
            return res.status(404).json({ message: "Rasm topilmadi" });
        }

        if (image && car.newImage) {
            const { error: deleteError } = await supabase.storage
                .from("Haval")
                .remove([car.newImage]);

            if (deleteError) {
                console.error(
                    "Eski rasmni o'chirishda xatolik:",
                    deleteError.message
                );
                return res.status(500).json({
                    message: "Eski rasmni o'chirishda xatolik yuz berdi.",
                });
            }
        }

        const updateData = {
            model: model || car.model,
            year: year || car.year,
            price: price || car.price,
            image: image || car.newImage,
        };

        const updateResult = await Car.updateOne(
            { _id: carId },
            { $set: updateData }
        );

        if (updateResult.modifiedCount === 0) {
            return res
                .status(400)
                .json({ message: "Ma'lumotlar yangilanmadi." });
        }

        res.status(200).json({
            message: "Mashina muvaffaqiyatli yangilandi",
            updatedData: updateData,
        });
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(500).json({ message: "Xatolik yuz berdi" });
    }
};

const deleteCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findOne({ _id: new ObjectId(carId) });

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

        const deleteResult = await Car.deleteOne({ _id: new ObjectId(carId) });

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
