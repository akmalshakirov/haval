const Video = require('../models/Video');
const mongoose = require("mongoose")
const { videoSchema } = require("../validators/video.validate")

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
  const { title, video, createdAt } = req.body;
  
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
    const newVideo = await Video.create({
      title,
      video,
      createdAt: formatDate(new Date()), 
      updatedAt: formatDate(new Date()), 
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
    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
        return res.status(404).json({ message: "Video topilmadi." });
    }

    console.log(body)
      const { value, error } = videoSchema.validate(body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

      const updateData = {
            title: value.title,
            video: value.video
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
