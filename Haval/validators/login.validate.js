const { body } = require("express-validator");

const validateLogin = [

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

module.exports = validateLogin;