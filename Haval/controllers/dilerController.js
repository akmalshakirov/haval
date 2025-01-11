const Diler = require('../models/Diler');
const mongoose = require("mongoose");

const getDiler = async (req, res) => {
  try {
    const dilers = await Diler.find(); 

    if(!dilers){
      return res.status(404).send({
        error: "Dilerlar  topilmadi!"
      })
    }

    res.status(200).json(dilers);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addDiler = async (req, res) => {
  const { title, manzil, workHoursDays, workHoursStart, workHoursEnd, phone } = req.body;
  try {
    const newDiler = await Diler.create({
      title,
      manzil,
      workHoursDays,
      workHoursStart,
      workHoursEnd,
      phone,
    });

    res.status(200).json({ message: 'Ma\'lumotlar muvaffaqiyatli yuborildi:', data: newDiler });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Bazaga ma\'lumot qo\'shishda xatolik yuz berdi' });
  }
};

const updateDiler = async (req, res) => {
  const { id } = req.params;
  const { dilerId, title, manzil, workHoursDays, workHoursStart, workHoursEnd, phone } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Noto'g'ri ID." });
        }

    const updateData = {};  
    
     if ( dilerId, title, manzil, workHours, phone) {
            await Diler.find({ dilerId, title, manzil, workHoursDays, workHoursStart, workHoursEnd, phone, _id: { $ne: id } });
              updateData.dilerId = dilerId;
              updateData.title = title; 
              updateData.manzil = manzil; 
              updateData.workHoursDays = workHoursDays; 
              updateData.workHoursStart = workHoursStart; 
              updateData.workHoursEnd = workHoursEnd;
              updateData.phone = phone;
        }
    
    const diler = await Diler.findByIdAndUpdate(id, updateData, { new: true });

    if (!diler) {
      return res.status(404).json({ error: 'Diler topilmadi' });
    } 

    return res.status(200).json({
        message: 'Diler ma\'lumotlari yangilandi',
        data: diler,
      });
  } catch (error) {
    console.log(err)
    res.status(500).json({ error: 'Ma\'lumotni yangilashda xatolik yuz berdi' });
  }
}

const deleteDiler = async (req, res) => {
  const { id } = req.params; 
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Yaroqsiz ID' });
    }
  
  try {
    const diler = await Diler.findById(id); 
    if (!diler) {
      res.status(404).json({ message: 'Diler topilmadi' });
    }

    await Diler.findByIdAndDelete(id);

    res.status(200).json({ message: 'Diler muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Ma\'lumotni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getDiler, addDiler, updateDiler, deleteDiler };
