const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  filename: { type: String },
  uploadedAt: { type: Date, default: Date.now },
    fullname: { type: String },
    phone: { type: String },
    model: { type: String },
    color: { type: String },
    engine: { type: String },
    transmission: { type: String },
    payment: { type: String },
  totalPrice: { type: Number, min: 0 },
  // paidAmount: { 
  //   type: Number, 
  //   default: 0, 
  //   min: 0,
  //   validate: {
  //     validator: function(value) {
  //       return value <= this.totalPrice;
  //     },age: "Paid amount cannot exceed total price."
    // }
  // },
  status: { type: String, enum: ["Pending", "Paid", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now, immutable: true }
});

OrderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
