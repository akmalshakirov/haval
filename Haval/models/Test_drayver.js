const mongoose = require("mongoose");

const Test_drayver = new mongoose.Schema({
    toliqIsm: {type: String, },
    model: {type: String, },
    phone: {type: String, unique: true, match: /^\+998\d{9}$/},
    izoh: {type: String, }
})

module.exports = mongoose.model("Test_drayver", Test_drayver);
