const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
  adminId: {type: mongoose.Schema.Types.ObjectId},
  adminName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, minlength: 8},
  role: {type: String, default: "admin"}
});


const admin = mongoose.model('Admin', Admin)

module.exports = admin