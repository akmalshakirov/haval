const mongoose = require("mongoose")

const Diler = new mongoose.Schema({
  dilerId: {type: mongoose.Schema.Types.ObjectId},
  title: {type: String, required: true},
  manzil: {type: String, required: true},
  workHours: {
    days: {
      type: String, 
      required: true,
      default: "du - yak", 
    },
    start: {
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
    },
    end: {
      type: String, 
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^\+998\d{9}$/,
  },
});

module.exports = Diler;
