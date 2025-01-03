const mongoose = require("mongoose")

const Diler = new mongoose.Schema({
  dilerId: {type: mongoose.Schema.Types.ObjectId},
  title: {type: String, required: true},
  manzil: {type: String, required: true},
  workHoursDays: {
      type: String, 
      required: true,
      default: "du - yak", 
  },
  workHoursStart: {
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
  },
  workHoursEnd: {
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^\+998\d{9}$/,
  },
  role: { type: String, default: "admin" }
});

module.exports =  mongoose.model('Diler', Diler);
