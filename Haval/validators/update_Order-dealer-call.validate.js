const { body, param } = require("express-validator");

const validateOreder_Dealer_CallUpdate = [
    param("id").isMongoId().withMessage("Yaroqsiz ID format!"),
  
    body("diler")
        .isString().withMessage("Diler string bo'lishi kerak!")
        .notEmpty().withMessage("DIler bo'sh bo'lmasligi kerak!"),

    body("toliqIsm")
        .isString().withMessage("To'liq ism string bo'lishi kerak!")
        .notEmpty().withMessage("To'liq ism bo'sh bo'lmasligi kerak!"),

    body("phone")
        .isString().withMessage("Telefon string bo'lishi kerak!")
        .notEmpty().withMessage("Telefon bo'sh bo'lmasligi kerak!"),

    body("email")
        .isString().withMessage("Email string bo'lishi kerak!")
        .isEmail().withMessage("Email noto'g'ri formatda!")
        .notEmpty().withMessage("Email bo'sh bo'lmasligi kerak!"),
        
    body("savolTuri")
        .isString().withMessage("Savol turi string bo'lishi kerak!")
        .notEmpty().withMessage("Savol turi bo'sh bo'lmasligi kerak!"),

    body("izoh")
        .isString().withMessage("Izoh string bo'lishi kerak!")
        .notEmpty().withMessage("Izoh bo'sh bo'lmasligi kerak!"),

]

module.exports = validateOreder_Dealer_CallUpdate;