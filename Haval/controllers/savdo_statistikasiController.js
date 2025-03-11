const Savdo_statistikasi = require('../models/Savdo_statistikasi');
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const getAllSavdoStatistikasi = async (req, res) => {
  try {
    const statistikalar = await Savdo_statistikasi.find(); 
    if (!statistikalar) {
      return res.status(404).send({ error: "Adminlar topilmadi!" }); 
    }
    
    return res.status(200).json(statistikalar);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addSavdoStatistikasi = async (req, res) => {
  try {
    const { title, description } = require(req.body)
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
        return res.status(404).json({ message: "Fayl topilmadi" });
    }

    const bucketName = "Haval";
    const { buffer, originalname } = req.file;
    const fileName = `savdoStatistikasi/${Date.now()}_${originalname}`;

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

    const newStatistika = await Savdo_statistikasi.create({
      title,
      description,
      image: imageUrl
    });

    return res.status(200).json({
      message: 'Savdo statistikasi muvaffaqiyatli qo\'shildi',
      data: newStatistika,
    });
  } catch (err) {
    res.status(500).json({ error: 'Savdo statistikasi qo\'shishda xatolik yuz berdi' });
  }
};

const updateSavdoStatistikasi = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, description } = require(req.body)

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
          title,
          description,
          image: imageUrl,
        };
    
    
    const updatedStatistika = await Savdo_statistikasi.findByIdAndUpdate(id, updateData, { new: true } );

    if (!updatedStatistika) {
      res.status(404).json({ error: 'Savdo statistikasi topilmadi' });
    }

    return res.status(200).json({
      message: 'Savdo statistikasi muvaffaqiyatli yangilandi',
      data: updatedStatistika,
    });
  } catch (err) {
    res.status(500).json({ error: 'Savdo statistikasi yangilashda xatolik yuz berdi' });
  }
};

const deleteSavdoStatistikasi = async (req, res) => {
  const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  try {
    const deletedStatistika = await Savdo_statistikasi.findById(id);

    if (!deletedStatistika) {
      res.status(404).json({ message: 'Savdo statistikasi topilmadi' });
    }

    await Savdo_statistikasi.findByIdAndDelete(id)

    return  res.status(200).json({ message: 'Savdo statistikasi muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Savdo statistikasi o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllSavdoStatistikasi, addSavdoStatistikasi, updateSavdoStatistikasi, deleteSavdoStatistikasi };
