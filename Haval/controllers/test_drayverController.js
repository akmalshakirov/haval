const Test_drayver = require('../models/Test_drayver');


const getTestDrivers = async (req, res) => {
  try {
    const drivers = await Test_drayver.find();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Bazaga ulanishda xatolik yuz berdi' });
  }
};

const addTestDriver = async (req, res) => {
  const { toliqIsm, model, phone, izoh } = req.body;
  try {
    const newDriver = new Test_drayver({
      toliqIsm,
      model,
      phone,
      izoh,
    });

    await newDriver.save();  
    res.status(201).json({
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
//     const updatedDriver = await Test_drayver.findByIdAndUpdate(
//       id,
//       { toliqIsm, model, phone, izoh },
//       { new: true }  
//     );

//     if (updatedDriver) {
//       res.status(200).json({
//         message: 'Test drayvga yozilish ma\'lumotlari yangilandi',
//         data: updatedDriver,
//       });
//     } else {
//       res.status(404).json({ error: 'Test drayvga yozilish topilmadi' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Test drayvga yozilishni yangilashda xatolik yuz berdi' });
//   }
// };

// const deleteTestDriver = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedDriver = await Test_drayver.findByIdAndDelete(id);

//     if (deletedDriver) {
//       res.status(200).json({ message: 'Test drayvga yozilish muvaffaqiyatli o\'chirildi' });
//     } else {
//       res.status(404).json({ message: 'Test drayvga yozilish topilmadi' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Test drayvga yozilishni o\'chirishda xatolik yuz berdi' });
//   }
// };

module.exports = { getTestDrivers, addTestDriver };
