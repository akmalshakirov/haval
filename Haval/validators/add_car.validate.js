const { body, param } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; // 100 KB
const maxSize = 4 * 1024 * 1024; // 4 MB

const validateCar = [
    body("year")
        .isInt().withMessage("Yili number bo'lishi kerak!")
        .notEmpty().withMessage("Yili bo'sh bo'lmasligi kerak!"),
    
    body("model")
        .isString().withMessage("Model string bo'lishi kerak!")
        .notEmpty().withMessage("Model bo'sh bo'lmasligi kerak!"),
    
    body("price")
        .isFloat({ min: 0 }).withMessage("Narxi musbat son bo‘lishi kerak!")
        .notEmpty().withMessage("Narxi bo'sh bo'lmasligi kerak!"),

    body("image")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Rasm talab qilinadi!");
            }

            const file = req.file;
            const fileExtension = file.originalname.split(".").pop().toLowerCase();
            if (!allowedFormats.includes(fileExtension)) {
                throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
            }

            if (file.size < minSize) {
                throw new Error("Rasm hajmi kamida 100 KB bo‘lishi kerak!");
            }

            if (file.size > maxSize) {
                throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
            }

            return true;
        })
];

module.exports = validateCar;
