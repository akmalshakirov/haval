const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    
    if(!admins){
      return res.status(404).send({
        error: "Adminlar  topilmadi!"
      })
    }

    return res.status(200).send(admins)

  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).send('Server error');
  }
};

exports.createAdmin = async (req, res) => {
  const { adminName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ adminName, email, password: hashedPassword });
 
    return res.send("Yaratildi")
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).send('Server error');
  }
};

exports.updateAdmin = async (req, res) => {
  const { adminId } = req.params;
  const { adminName, email, password } = req.body;
  try {
    const updateData = { adminName, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
    
    return res.status(200).send("Yangilandi")
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).send('Server error');
  }
};

exports.deleteAdmin = async (req, res) => {
  const { adminId } = req.params;
  try {
    const userId = req.cookies.userId;

    const admin = await Admin.findById(adminId);
    if (admin && admin._id.toString() !== userId) {
      await Admin.findByIdAndDelete(id);
    }

    return res.send("O'chirildi")
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).send('Server error');
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
      { expiresIn: '1h' } 
    );

    return res.status(200).send({
      token
    })
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
  
  return res.send("Chiqish")
};


// module.exports = { getAllAdmin, createAdmin, updateAdmin, deleteAdmin, getAdminDashboard, loginAdmin, logoutAdmin };
