const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  filename: String, 
  uploadedAt: { type: Date, default: Date.now },
  metadata: { 
    fullname: String,
    phone: String,
    model: String,
    color: String,
    engine: String,
    transmission: String,
    payment: String,
    prepayment: String
  }
});

module.exports = mongoose.model("PDF", pdfSchema);
