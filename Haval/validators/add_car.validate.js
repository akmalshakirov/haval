const { checkSchema } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 10 * 1024; 
const maxSize = 4 * 1024 * 1024;

exports.validateCar = checkSchema({
    year: {
        in: ["body"],
        isInt: { errorMessage: "Yili number bo'lishi kerak!" },
        notEmpty: { errorMessage: "Yili bo'sh bo'lmasligi kerak!" }
    },
    model: {
        in: ["body"],
        isString: { errorMessage: "Model string bo'lishi kerak!" },
        notEmpty: { errorMessage: "Model bo'sh bo'lmasligi kerak!" }
    },
    price: {
        in: ["body"],
        isFloat: { options: { min: 0 }, errorMessage: "Narxi musbat son bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Narxi bo'sh bo'lmasligi kerak!" }
    },
    image: {
        custom: {
            options: (value, { req }) => {
                if (!req.file) {
                    throw new Error("Rasm talab qilinadi!");
                }

                const file = req.file;
                const fileExtension = file.originalname.split(".").pop().toLowerCase();

                if (!allowedFormats.includes(fileExtension)) {
                    throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
                }

                if (file.size < minSize) {
                    throw new Error("Rasm hajmi kamida 10 KB bo‘lishi kerak!");
                }

                if (file.size > maxSize) {
                    throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
                }

                return true;
            }
        }
    }
});
