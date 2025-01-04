const mongoose = require("mongoose")

const User = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: true, unique: true, minlength: 3, maxlength: 20},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8},
  role: [{type: String,  default: ["User"]}] 
});

module.exports = mongoose.model('User', User)
