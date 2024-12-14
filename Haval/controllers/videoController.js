const Video = require('../models/Video');


const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();  
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addVideo = async (req, res) => {
  const { title, video, createdAt } = req.body;
  try {
    const newVideo = new Video({
      title,
      video,
      createdAt,
      updatedAt: createdAt,
    });

    await newVideo.save();
    res.status(201).json({
      message: 'Video muvaffaqiyatli qo\'shildi',
      data: newVideo,
    });
  } catch (err) {
    res.status(500).json({ error: 'Video qo\'shishda xatolik yuz berdi' });
  }
};


const updateVideo = async (req, res) => {
  const videoId = req.params.id;
  const { title, video } = req.body;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, video, updatedAt: new Date().toISOString() },  
      { new: true }  
    );

    if (updatedVideo) {
      res.status(200).json({
        message: 'Video muvaffaqiyatli yangilandi',
        data: updatedVideo,
      });
    } else {
      res.status(404).json({ error: 'Video topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Video yangilashda xatolik yuz berdi' });
  }
};


const deleteVideo = async (req, res) => {
  const videoId = req.params.id;
  try {
    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (deletedVideo) {
      res.status(200).json({ message: 'Video muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Video topilmadi' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getVideos, addVideo, updateVideo, deleteVideo };
