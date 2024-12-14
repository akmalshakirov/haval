const mongoose = require("mongoose");

const Car = new mongoose.Schema({
  model: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  year: { type: Number, required: true }, 
  price: { type: Number, required: true },
  image: {type: String, required: true},
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  }
})

module.exports = Car;