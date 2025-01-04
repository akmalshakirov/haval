const mongoose = require("mongoose");

const orderDealerCall = new mongoose.Schema({
  diler: { type: String, required: true },
  toliqIsm: { type: String, required: true },
  phone: { type: String, required: true, unique: true, match: /^\+998\d{9}$/ },
  email: { type: String, required: true, unique: true },
  savolTuri: { type: String, required: true },
  izoh: { type: String, required: true }
});

module.exports = mongoose.model("Oreder_dealer_call", orderDealerCall);
