const { body, param } = require("express-validator");

const validateDilerUpdate = [
    param("id").isMongoId().withMessage("Yaroqsiz ID format!"),

    body("title")
        .isString().withMessage("Sarlavha string bo'lishi kerak!")
        .notEmpty().withMessage("Sarlavha bo'sh bo'lmasligi kerak!")
        .isLength({ min: 10 }).withMessage("Admin nomida 10 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 150 }).withMessage("Admin nomi 150 ta belgidan ko'p bo'lmasligi kerak!"),

    body("manzil")
        .isString().withMessage("Manzil string bo'lishi kerak!")
        .notEmpty().withMessage("Manzil bo'sh bo'lmasligi kerak!"),

    body("workHoursDays")
        .isString().withMessage("Ish kunlari string bo'lishi kerak!")
        .notEmpty().withMessage("Ish kunlari bo'sh bo'lmasligi kerak!"),

    body("workHoursStart")
        .isString().withMessage("Ish boshlanishi string bo'lishi kerak!")
        .notEmpty().withMessage("Ish boshlanishi bo'sh bo'lmasligi kerak!"),

    body("workHoursEnd")
        .isString().withMessage("Ish tugashi string bo'lishi kerak!")
        .notEmpty().withMessage("Ish tugashi bo'sh bo'lmasligi kerak!"),
        
    body("phone")
        .isString().withMessage("Telefon string bo'lishi kerak!")
        .notEmpty().withMessage("Telefon bo'sh bo'lmasligi kerak!"),
]


module.exports = validateDilerUpdate;