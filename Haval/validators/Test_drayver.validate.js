const { body } = require("express-validator");

const validateTest_drayver = [
  
    body("toliqIsm")
        .isString().withMessage("To'liq ism string bo'lishi kerak!")
        .notEmpty().withMessage("To'liq ism bo'sh bo'lmasligi kerak!"),
        
    body("model")
        .isString().withMessage("Model string bo'lishi kerak!")
        .notEmpty().withMessage("Model bo'sh bo'lmasligi kerak!"),

    body("phone")
        .isString().withMessage("Telefon string bo'lishi kerak!")
        .notEmpty().withMessage("Telefon bo'sh bo'lmasligi kerak!"),

    body("izoh")
        .isString().withMessage("Izoh string bo'lishi kerak!")
        .notEmpty().withMessage("Izoh bo'sh bo'lmasligi kerak!"),

]

module.exports = validateTest_drayver;