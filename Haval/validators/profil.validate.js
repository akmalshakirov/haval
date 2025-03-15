const { checkSchema } = require("express-validator");

exports.validateProfilUpdate = checkSchema({
    id: {
        in: ["params"],
        isMongoId: {
            errorMessage: "Yaroqsiz ID format!"
        }
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Nomi string bo‘lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Nomi bo‘sh bo‘lmasligi kerak!"
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "Nomida 2 ta belgidan kam bo‘lmasligi kerak!"
        },
        isLength: {
            options: { max: 50 },
            errorMessage: "Nomi 50 ta belgidan ko‘p bo‘lmasligi kerak!"
        }
    },
    email: {
        in: ["body"],
        isString: {
            errorMessage: "Email string bo‘lishi kerak!"
        },
        isEmail: {
            errorMessage: "Email noto‘g‘ri formatda!"
        },
        notEmpty: {
            errorMessage: "Email bo‘sh bo‘lmasligi kerak!"
        }
    },
    password: {
        in: ["body"],
        isString: {
            errorMessage: "Parol string bo‘lishi kerak!"
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Parol 6 ta belgidan kam bo‘lmasligi kerak!"
        },
        isLength: {
            options: { max: 20 },
            errorMessage: "Parol 20 ta belgidan ko‘p bo‘lmasligi kerak!"
        }
    }
});