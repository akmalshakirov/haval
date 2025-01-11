const Oreder_dealer_call = require('../models/Order-dealer-call');
const mongoose = require("mongoose");

const getAllDealerCalls = async (req, res) => {
  try {
    const dealerCalls = await Oreder_dealer_call.find();

    if (!dealerCalls) {
      return res.status(404).send({ error: "dealerCalls topilmadi!" }); 
    }
    return res.status(200).json(dealerCalls);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addDealerCall = async (req, res) => {
  const { diler, toliqIsm, phone, email, savolTuri, izoh } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email noto'g'ri formatda." });
    }

    const newDealerCall = await Oreder_dealer_call.create({
      diler,
      toliqIsm,
      phone,
      email,
      savolTuri,
      izoh
    });

    return res.status(200).json({
      message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli qo\'shildi',
      data: newDealerCall
    });
  } catch (err) {
    res.status(500).json({ error: 'Diler qo\'ng\'irog\'iga buyurtma berishda xatolik yuz berdi' });
  }
};

const updateDealerCall = async (req, res) => {
  const { id } = req.params;
  const { diler, toliqIsm, phone, email, savolTuri, izoh } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
 if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Noto'g'ri car ID." });
    }

    const updateData = {};

    if (email) {
          if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email noto'g'ri formatda." });
          }
          const existingAdmin = await Admin.findOne({ email, _id: { $ne: id } });
          if (existingAdmin) {
            return res.status(400).json({ error: "Bu email bilan boshqa admin allaqachon mavjud." });
          }
          updateData.email = email;
        }
    
    if (diler, toliqIsm, phone, savolTuri, izoh) {
        await Car.find({diler, toliqIsm, phone,  savolTuri, izoh, _id: { $ne: id } });
          updateData.diler = diler;
          updateData.toliqIsm = toliqIsm; 
          updateData.phone = phone; 
          updateData.savolTuri = savolTuri; 
          updateData.izoh = izoh; 
    }

    const updatedDealerCall = await Oreder_dealer_call.findByIdAndUpdate(id, updateData, { new: true } )

    if (!updatedDealerCall) {
      res.status(404).json({ error: 'Diler qo\'ng\'irog\'i topilmadi' });
    }

    return res.status(200).json({
      message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli yangilandi',
      data: updatedDealerCall
    });
  } catch (err) {
    res.status(500).json({ error: 'Diler qo\'ng\'irog\'ini yangilashda xatolik yuz berdi' });
  }
};

const deleteDealerCall = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDealerCall = await Oreder_dealer_call.findById(id);

    if (!deletedDealerCall) {
      res.status(404).json({ message: 'Diler qo\'ng\'irog\'iga buyurtma berish topilmadi' });
    }

    await Oreder_dealer_call.findByIdAndDelete(id)
    res.status(200).json({ message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Diler qo\'ng\'irog\'iga buyurtma berishni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllDealerCalls, addDealerCall, updateDealerCall, deleteDealerCall };
