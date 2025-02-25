// const { body, param } = require("express-validator");

// exports.adminValidationRules = [
//     body("adminName")
//         .isString().withMessage("Admin nomi string bo'lishi kerak!")
//         .notEmpty().withMessage("Admin nomi bo'sh bo'lmasligi kerak!")
//         .isLength({ min: 2 }).withMessage("Admin nomida 2 ta belgidan kam bo'lmasligi kerak!")
//         .isLength({ max: 50 }).withMessage("Admin nomi 50 ta belgidan ko'p bo'lmasligi kerak!"),

//     body("email")
//         .isString().withMessage("Email string bo'lishi kerak!")
//         .isEmail().withMessage("Email noto'g'ri formatda!")
//         .notEmpty().withMessage("Email bo'sh bo'lmasligi kerak!"),

//     body("password")
//         .isString().withMessage("Parol string bo'lishi kerak!")
//         .notEmpty().withMessage("Parol bo'sh bo'lmasligi kerak!")
//         .isLength({ min: 6 }).withMessage("Parol 6 ta belgidan kam bo'lmasligi kerak!")
//         .isLength({ max: 20 }).withMessage("Parol 20 ta belgidan ko'p bo'lmasligi kerak!")
// ];

const { checkSchema } = require("express-validator");

exports.adminValidationRules = {
    adminName: {
        in: ["body"],
        isString: { errorMessage: "Admin nomi string bo'lishi kerak!" },
        notEmpty: { errorMessage: "Admin nomi bo'sh bo'lmasligi kerak!" },
        isLength: {
            options: { min: 2 },
            errorMessage: "Admin nomida 2 ta belgidan kam bo'lmasligi kerak!"
        }
    },
    email: {
        in: ["body"],
        isString: { errorMessage: "Email string bo'lishi kerak!" },
        isEmail: { errorMessage: "Email noto'g'ri formatda!" },
        notEmpty: { errorMessage: "Email bo'sh bo'lmasligi kerak!" }
    },
    password: {
        in: ["body"],
        isString: { errorMessage: "Parol string bo'lishi kerak!" },
        notEmpty: { errorMessage: "Parol bo'sh bo'lmasligi kerak!" },
        isLength: {
            options: { min: 6 },
            errorMessage: "Parol 6 ta belgidan kam bo'lmasligi kerak!"
        },
        isLength: {
            options: { max: 20 },
            errorMessage: "Parol 20 ta belgidan ko'p bo'lmasligi kerak!"
        }
    }
};
