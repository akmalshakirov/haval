const { Schema,  mongoose } = require("mongoose");

const Car = new mongoose.Schema({
  model: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  year: { type: Number, required: true }, 
  price: { type: Number, required: true },
  image: { type: Buffer },
  role: { type: String, default: "admin" },
})

module.exports = mongoose.model('Car', Car);
