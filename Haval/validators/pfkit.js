const { body } = require("express-validator");

const pdfValidationRules = [
    body("fullname")
        .isString().withMessage("Foydalanuvchi nomi string bo'lishi kerak!")
        .notEmpty().withMessage("Foydalanuvchi nomi bo'sh bo'lmasligi kerak!")
        .isLength({ min: 2 }).withMessage("Foydalanuvchi nomi 2 ta dan kam bo'lmasligi kerak!")
        .isLength({ max: 20 }).withMessage("Foydalanuvchi nomi 20 ta dan ko'p bo'lmasligi kerak!"),
    
    body("phone")
        .isString().withMessage("Telefon string bo'lishi kerak!")
        .notEmpty().withMessage("Telefon bo'sh bo'lmasligi kerak!"),
    
    body("model")
        .isString().withMessage("Model string bo'lishi kerak!")
        .notEmpty().withMessage("Model bo'sh bo'lmasligi kerak!"),
    
    body("color")
        .isString().withMessage("Rangi string bo'lishi kerak!")
        .notEmpty().withMessage("Rangi bo'sh bo'lmasligi kerak!"),

    body("engine")
        .isString().withMessage("Dvigatel hajmi string bo'lishi kerak!")
        .notEmpty().withMessage("Dvigatel hajmi bo'sh bo'lmasligi kerak!"),

    body("transmission")
        .isString().withMessage("Uzatmalar qutisi string bo'lishi kerak!")
        .notEmpty().withMessage("Uzatmalar qutisi bo'sh bo'lmasligi kerak!"),

    body("payment")
        .isString().withMessage("To‘lov turi string bo'lishi kerak!")
        .notEmpty().withMessage("To‘lov turi bo'sh bo'lmasligi kerak!"),

    body("prepayment")
        .isString().withMessage("Oldindan to‘lov string bo'lishi kerak!")
        .notEmpty().withMessage("Oldindan to‘lov bo'sh bo'lmasligi kerak!"),
];

module.exports = pdfValidationRules;