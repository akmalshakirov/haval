const mongoose = require("mongoose")

const User = new mongoose.Schema({
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
  name: {type: String, unique: true, minlength: 3, maxlength: 20},
  email: {type: String, unique: true},
  password: {type: String, minlength: 8},
  role: [{type: String,  default: ["User"]}] 
});

module.exports = mongoose.model('User', User)
