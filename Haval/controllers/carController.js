const { Car } = require("../models/Car");
const mongoose = require("mongoose");
const { supabase } = require("../config/supabaseClient");
require("dotenv").config();
const storageUrl = process.env.SUPABASE_URL;
const { validationResult } = require("express-validator");

const getCars = async (req, res) => {
    try {
        const cars = await Car.find();

        if (!cars) {
            return res.status(404).send({
                error: "Carlar  topilmadi!",
            });
        }

        return res.status(200).send({
            message: "Mashinalar",
            cars,
        });
    } catch (err) {
        res.status(500).json({ error: "Bazaga ulanishda xatolik yuz berdi" });
    }
};

const addCar = async (req, res) => {
    try {
      const { model, year, price } = req.body;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      console.log(req.files);
      if (!req.files || req.files.length === 0) {
        return res.status(404).json({ message: "Fayllar topilmadi" });
      }
  
      const bucketName = "Haval";
      const imageUrls = [];
  
      for (const file of req.files) {
        const { buffer, originalname, mimetype } = file;
        const fileBuffer = Buffer.from(buffer)
        const fileName = `cars/${Date.now()}_${originalname}`;
  
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, fileBuffer, {
            cacheControl: "3600",
            upsert: false,
            contentType: mimetype,
          });
  
        if (uploadError) {
          console.error("Tasvirni yuklashda xato:", uploadError.message);
          return res.status(500).json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
        }
  
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);
  
        imageUrls.push(publicUrlData.publicUrl);
      }
  
      const result = await Car.create({
        model,
        year,
        price,
        images: imageUrls
      });
  
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
    const {
        body,
        params: { id },
    } = req;

    try {
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
            const fileName = `cars/${Date.now()}_${originalname}`;

            if (existingCar.image) {
                const oldImagePath = existingCar.image.replace(`${storageUrl}/object/public/Haval/`, "");

                console.log(oldImagePath);
                const { error: removeError } = await supabase.storage
                    .from(bucketName)
                    .remove([oldImagePath]);

                if (removeError) {
                    console.error("❌ Eski tasvirni o‘chirishda xato:", removeError.message);
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
                console.error("❌ Tasvirni yuklashda xato:", uploadError.message);
                return res.status(500).json({ error: "Tasvirni yuklashda xatolik yuz berdi." });
            }

            const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        }

        const updateData = {
            model: body.model,
            year: body.year,
            price: body.price,
            image: imageUrl,
        };

        const carUpdate = await Car.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            message: "✅ Mashina muvaffaqiyatli yangilandi",
            data: carUpdate,
        });
    } catch (err) {
        console.error("❌ Server xatosi:", err);
        res.status(500).json({ error: "Ichki server xatosi yuz berdi." });
    }
};


const deleteCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Mashina topilmadi" });
        }

        if (car.imagePath) {
            const { data, error } = await supabase.storage
                .from("Haval")
                .remove([car.imagePath]);

            if (error) {
                console.error(
                    "❌ Supabase rasmni o‘chirishda xatolik:",
                    error.message
                );
                return res
                    .status(500)
                    .json({ message: "Rasmni o‘chirishda xatolik yuz berdi." });
            }
        }

        const deleteResult = await Car.deleteOne({ _id: carId });

        if (deleteResult.deletedCount === 0) {
            return res.status(500).json({ message: "Mashina o‘chirilmadi" });
        }

        res.status(200).json({
            message: "✅ Mashina muvaffaqiyatli o‘chirildi",
        });
    } catch (error) {
        console.error("❌ Xatolik:", error);
        res.status(500).json({ message: "Server xatosi yuz berdi" });
    }
};

module.exports = { getCars, addCar, updateCar, deleteCar };
