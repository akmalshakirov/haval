const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  filename: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  metadata: { 
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    engine: { type: String, required: true },
    transmission: { type: String, required: true },
    payment: { type: String, required: true },
    prepayment: { type: String, required: true }
  },
  totalPrice: { type: Number, required: true, min: 0 },
  paidAmount: { 
    type: Number, 
    default: 0, 
    min: 0,
    validate: {
      validator: function(value) {
        return value <= this.totalPrice;
      },
      message: "Paid amount cannot exceed total price."
    }
  },
  status: { type: String, enum: ["Pending", "Paid", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now, immutable: true }
});

OrderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
