const { body, param } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; // 100 KB
const maxSize = 4 * 1024 * 1024; // 4 MB

const validateNews = [
    body("title")
        .isString().withMessage("Sarlavha string bo'lishi kerak!")
        .notEmpty().withMessage("Sarlavha bo'sh bo'lmasligi kerak!")
        .isLength({ min: 20 }).withMessage("Sarlavhada 20 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 150 }).withMessage("Sarlavha 150 ta belgidan ko'p bo'lmasligi kerak!"),

    
    body("description")
        .isString().withMessage("Matn string bo‘lishi kerak!")
        .notEmpty().withMessage("Matn bo'sh bo'lmasligi kerak!")
        .isLength({ min: 50 }).withMessage("Matnda 50 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 250 }).withMessage("Matn 250 ta belgidan ko'p bo'lmasligi kerak!"),


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

module.exports = validateNews;
