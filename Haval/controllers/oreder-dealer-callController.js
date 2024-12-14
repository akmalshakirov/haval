const Oreder_dealer_call = require('../models/Order-dealer-call');

const getAllDealerCalls = async (req, res) => {
  try {
    const dealerCalls = await Oreder_dealer_call.find();
    res.status(200).json(dealerCalls);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addDealerCall = async (req, res) => {
  const { diler, toliqIsm, phone, email, savolTuri, izoh } = req.body;
  try {
    const newDealerCall = new Oreder_dealer_call({
      diler,
      toliqIsm,
      phone,
      email,
      savolTuri,
      izoh
    });

    await newDealerCall.save();
    res.status(201).json({
      message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli qo\'shildi',
      data: newDealerCall
    });
  } catch (err) {
    res.status(500).json({ error: 'Diler qo\'ng\'irog\'iga buyurtma berishda xatolik yuz berdi' });
  }
};

// const updateDealerCall = async (req, res) => {
//   const { id } = req.params;
//   const { diler, toliqIsm, phone, email, savolTuri, izoh } = req.body;
//   try {
//     const updatedDealerCall = await Oreder_dealer_call.findByIdAndUpdate(
//       id,
//       { diler, toliqIsm, phone, email, savolTuri, izoh },
//       { new: true }
//     );

//     if (updatedDealerCall) {
//       res.status(200).json({
//         message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli yangilandi',
//         data: updatedDealerCall
//       });
//     } else {
//       res.status(404).json({ error: 'Diler qo\'ng\'irog\'i topilmadi' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Diler qo\'ng\'irog\'ini yangilashda xatolik yuz berdi' });
//   }
// };

const deleteDealerCall = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDealerCall = await Oreder_dealer_call.findByIdAndDelete(id);

    if (deletedDealerCall) {
      res.status(200).json({ message: 'Diler qo\'ng\'irog\'iga buyurtma berish muvaffaqiyatli o\'chirildi' });
    } else {
      res.status(404).json({ message: 'Diler qo\'ng\'irog\'iga buyurtma berish topilmadi' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Diler qo\'ng\'irog\'iga buyurtma berishni o\'chirishda xatolik yuz berdi' });
  }
};

module.exports = { getAllDealerCalls, addDealerCall, deleteDealerCall };
