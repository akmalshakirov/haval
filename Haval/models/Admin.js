const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
  adminName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: "admin" },
});

module.exports = mongoose.model('Admin', Admin);
