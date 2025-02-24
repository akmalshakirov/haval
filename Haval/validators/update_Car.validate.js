const { body, param } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; 
const maxSize = 4 * 1024 * 1024; 

const validateCarUpdate = [
    param("id").isMongoId().withMessage("Yaroqsiz ID format!"),

    body("year")
        .isInt().withMessage("Yili raqam bo‘lishi kerak!")
        .notEmpty().withMessage("Yili bo‘sh bo‘lmasligi kerak!"),

    body("model")
        .isString().withMessage("Model matn bo‘lishi kerak!")
        .notEmpty().withMessage("Model bo‘sh bo‘lmasligi kerak!"),

    body("price")
        .isFloat({ min: 0 }).withMessage("Narxi musbat son bo‘lishi kerak!")
        .notEmpty().withMessage("Narxi bo‘sh bo‘lmasligi kerak!"),

    body("image").custom((_, { req }) => {
        if (!req.file) return true; 

        const { originalname, size } = req.file;
        const fileExtension = originalname.split(".").pop().toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
            throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
        }

        if (size < minSize) {
            throw new Error("Rasm hajmi kamida 100 KB bo‘lishi kerak!");
        }

        if (size > maxSize) {
            throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
        }

        return true;
    })
];

module.exports = validateCarUpdate;
