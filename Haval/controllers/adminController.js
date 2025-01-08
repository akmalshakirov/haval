const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    if (!admins) {
      return res.status(404).send({ error: "Adminlar topilmadi!" }); 
    }

    return res.status(200).send({
      message: "Adminlar",
      admins}); 
  } catch (error) {
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};


exports.getAdminById = async (req, res) => {
  const { id } = req.params;  

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).send({ error: "Admin topilmadi!" });  
    }

    return res.status(200).send(admin);  

  } catch (error) {
    console.error('Adminni olishda xato:', error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.createAdmin = async (req, res) => {
  const { adminName, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email noto'g'ri formatda." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Bu email bilan admin allaqachon mavjud." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({ adminName, email, password: hashedPassword });

    return res.status(201).json({ message: "Admin muvaffaqiyatli yaratildi" });
  } catch (error) {
    console.error("Admin yaratishda xatolik:", error);
    return res.status(500).json({ error: "Server xatosi yuz berdi" });
  }
};

exports.updateAdmin = async (req, res) => {
  const { adminId } = req.params; 
  const { adminName, email, password } = req.body; 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: "Noto'g'ri admin ID." });
    }

    const updateData = {};

    if (adminName) {
      updateData.adminName = adminName;
    }

    if (email) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email noto'g'ri formatda." });
      }

      const existingAdmin = await Admin.findOne({ email, _id: { $ne: adminId } });
      if (existingAdmin) {
        return res.status(400).json({ error: "Bu email bilan boshqa admin allaqachon mavjud." });
      }
      updateData.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin topilmadi." });
    }

    return res.status(200).json({
      message: "Admin muvaffaqiyatli yangilandi",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Adminni yangilashda xatolik:", error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const userId = req.cookies.userId;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin topilmadi!" });
    }

    if (admin._id.toString() !== userId) {
      return res.status(403).json({ error: "Siz bu adminni o'chirishga ruxsatga ega emassiz!" });
    }

    await Admin.findByIdAndDelete(adminId);

    return res.status(200).json({ message: "Admin muvaffaqiyatli o'chirildi." });
  } catch (error) {
    console.error("Adminni o'chirishda xato:", error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};


exports.loginAdmin = async (req, res) => {
  console.log(req.body);
  
  const { email, password } = req.body; 
  try {
    const admin = await Admin.findOne({ email });
    console.log(admin);
    
    if (!admin) {
      return res.status(404).send('Admin not found'); 
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials'); 
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        adminName: admin.adminName,
        role: admin.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' } 
    );

    return res.status(200).send({
      token
    })
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};
