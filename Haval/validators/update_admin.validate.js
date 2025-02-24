const { param, body } = require('express-validator');

exports.adminValidationRulesUpdate = [
    param("id").isMongoId().withMessage("Yaroqsiz ID format!"),

    body("adminName")
        .isString().withMessage("Admin nomi string bo'lishi kerak!")
        .notEmpty().withMessage("Admin nomi bo'sh bo'lmasligi kerak!")
        .isLength({ min: 2 }).withMessage("Admin nomida 2 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 50 }).withMessage("Admin nomi 50 ta belgidan ko'p bo'lmasligi kerak!"),

    body("email")
        .isString().withMessage("Email string bo'lishi kerak!")
        .isEmail().withMessage("Email noto'g'ri formatda!")
        .notEmpty().withMessage("Email bo'sh bo'lmasligi kerak!"),

    body("password")
        .isString().withMessage("Parol string bo'lishi kerak!")
        .notEmpty().withMessage("Parol bo'sh bo'lmasligi kerak!")
        .isLength({ min: 6 }).withMessage("Parol 6 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 20 }).withMessage("Parol 20 ta belgidan ko'p bo'lmasligi kerak!"),
]

// module.exports = adminValidationRulesUpdate;