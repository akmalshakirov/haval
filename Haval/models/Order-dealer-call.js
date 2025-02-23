const mongoose = require("mongoose");

const orderDealerCall = new mongoose.Schema({
  diler: { type: String, },
  toliqIsm: { type: String, },
  phone: { type: String, unique: true, match: /^\+998\d{9}$/ },
  email: { type: String, unique: true },
  savolTuri: { type: String, },
  izoh: { type: String, }
});

module.exports = mongoose.model("Oreder_dealer_call", orderDealerCall);
