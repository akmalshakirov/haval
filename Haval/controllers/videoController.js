const Video = require('../models/Video');
const mongoose = require("mongoose")
const { validationResult } = require("express-validator");

exports.getVideos = async (req, res) => {
  try {
      const videos = await Video.find();
      
    if (!videos) {
      return res.status(404).send({ error: "Videolar topilmadi!" }); 
    }

      return res.status(200).json(videos);
  } catch (err) {
      console.error('Xatolik yuz berdi:', err.message);
      return res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const { title, video } = require(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newVideo = await Video.create({
      title,
      video,
    });

    return res.status(200).json({
      message: 'Video muvaffaqiyatli qo\'shildi',
      data: newVideo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Video qo\'shishda xatolik yuz berdi' });
  }
};

exports.updateVideo = async (req, res) => {
  const {
    body,
    params: { id },
} = req;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
        return res.status(404).json({ message: "Video topilmadi." });
    }

    const { title, video } = require(req.body);

      const updateData = {
        title,
        video
      }

    const updatedVideo = await Video.findByIdAndUpdate(id, updateData, { new: true });
    
    return res.status(200).json({
      message: 'Video muvaffaqiyatli yangilandi',
      data: updatedVideo,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Video yangilashda xatolik yuz berdi' });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  try {
    const deletedVideo = await Video.findByIdA(id);

    if (!deletedVideo) {
    } else {
      res.status(404).json({ message: 'Video topilmadi' });
    }
    
    await Video.findByIdAndDelete(id)
    
    return res.status(200).json({ message: 'Video muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video o\'chirishda xatolik yuz berdi' });
  }
};
