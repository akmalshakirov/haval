const { checkSchema } = require("express-validator");

exports.adminValidationRules = checkSchema({
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
        isLength: [
            {
                options: { min: 6 },
                errorMessage: "Parol 6 ta belgidan kam bo'lmasligi kerak!"
            },
            {
                options: { max: 20 },
                errorMessage: "Parol 20 ta belgidan ko'p bo'lmasligi kerak!"
            }
        ]
    }
});
