const { body, param } = require("express-validator");

const validateRegister = [
    body("userName")
        .isString().withMessage("Ism string bo'lishi kerak!")
        .notEmpty().withMessage("Ism bo'sh bo'lmasligi kerak!")
        .isLength({ min: 2 }).withMessage("Ism 2 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 50 }).withMessage("Ism 50 ta belgidan ko'p bo'lmasligi kerak!"),

    body("email")
        .isString().withMessage("Email string bo'lishi kerak!")
        .isEmail().withMessage("Email noto'g'ri formatda!")
        .notEmpty().withMessage("Email bo'sh bo'lmasligi kerak!"),

    body("password")
        .isString().withMessage("Parol string bo'lishi kerak!")
        .notEmpty().withMessage("Parol bo'sh bo'lmasligi kerak!")
        .isLength({ min: 6 }).withMessage("Parol 6 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 20 }).withMessage("Parol 20 ta belgidan ko'p bo'lmasligi kerak!")
];

module.exports = validateRegister;