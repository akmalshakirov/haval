const { body } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; // 100 KB
const maxSize = 4 * 1024 * 1024; // 4 MB

const validateNewsUpdate = [
    param("id").isMongoId().withMessage("Yaroqsiz ID format!"),
    
    body("title")
        .isString().withMessage("Sarlavha string bo'lishi kerak!")
        .notEmpty().withMessage("Sarlavha bo'sh bo'lmasligi kerak!"),
    
    body("description")
        .isString().withMessage("Matn string bo‘lishi kerak!")
        .notEmpty().withMessage("Matn bo'sh bo'lmasligi kerak!"),

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

module.exports = validateNewsUpdate;
