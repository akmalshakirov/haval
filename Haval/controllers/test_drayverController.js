const Test_drayver = require('../models/Test_drayver');
const mongoose = require('mongoose')

const getTestDrivers = async (req, res) => {
  try {
    const drivers = await Test_drayver.find();

    if (!drivers) {
      return res.status(404).send({ error: "Drivers topilmadi!" }); 
    }

    return res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addTestDriver = async (req, res) => {
  try {
    const { toliqIsm, model, phone, izoh } = require(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const newDriver = await Test_drayver.create({
      toliqIsm,
      model,
      phone,
      izoh
    });
 
    return res.status(200).json({
      message: 'Test drayvga yozilish muvaffaqiyatli qo\'shildi',
      data: newDriver,
    });
  } catch (err) {
    res.status(500).json({ error: 'Test drayvga yozilishda xatolik yuz berdi' });
  }
};

// const updateTestDriver = async (req, res) => {
//   const { id } = req.params;
//   const { toliqIsm, model, phone, izoh } = req.body;
//   try {
  // const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //   }
//  if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Noto'g'ri ID." });
//     }

//     const updateData = {};

//     if (toliqIsm, model, phone, izoh) {
//         await Car.find({ toliqIsm, model, phone, izoh, _id: { $ne: id } });
//           updateData.toliqIsm = toliqIsm; 
//           updateData.model = model;
//           updateData.phone = phone; 
//           updateData.izoh = izoh; 
//     }

//     const updatedDriver = await Test_drayver.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedDriver) {
//       res.status(404).json({ error: 'Test drayvga yozilish topilmadi' });
//     }

//       res.status(200).json({
//         message: 'Test drayvga yozilish ma\'lumotlari yangilandi',
//         data: updatedDriver,
//       });
//   } catch (err) {
//     res.status(500).json({ error: 'Test drayvga yozilishni yangilashda xatolik yuz berdi' });
//   }
// };

// const deleteTestDriver = async (req, res) => {
//   const { id } = req.params;

//  if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Yaroqsiz ID' });
//   }

//   try {
//     const deletedDriver = await Test_drayver.findById(id);

//     if (!deletedDriver) {
    //       res.status(404).json({ message: 'Test drayvga yozilish topilmadi' });
    //     }

    //  await Test_drayver.findByIdAndDelete(id)

    //      return res.status(200).json({ message: 'Test drayvga yozilish muvaffaqiyatli o\'chirildi' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Test drayvga yozilishni o\'chirishda xatolik yuz berdi' });
//   }
// };

module.exports = { getTestDrivers, addTestDriver };
