const { checkSchema } = require("express-validator");

exports.pdfValidationRules = checkSchema({
    fullname: {
        in: ["body"],
        isString: { errorMessage: "Foydalanuvchi nomi string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Foydalanuvchi nomi bo‘sh bo‘lmasligi kerak!" },
        isLength: {
            options: { min: 2 },
            errorMessage: "Foydalanuvchi nomi 2 ta belgidan kam bo‘lmasligi kerak!"
        },
        isLength: {
            options: { max: 20 },
            errorMessage: "Foydalanuvchi nomi 20 ta belgidan ko‘p bo‘lmasligi kerak!"
        }
    },
    phone: {
        in: ["body"],
        isString: { errorMessage: "Telefon string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Telefon bo‘sh bo‘lmasligi kerak!" }
    },
    model: {
        in: ["body"],
        isString: { errorMessage: "Model string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Model bo‘sh bo‘lmasligi kerak!" }
    },
    color: {
        in: ["body"],
        isString: { errorMessage: "Rangi string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Rangi bo‘sh bo‘lmasligi kerak!" }
    },
    engine: {
        in: ["body"],
        isString: { errorMessage: "Dvigatel hajmi string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Dvigatel hajmi bo‘sh bo‘lmasligi kerak!" }
    },
    transmission: {
        in: ["body"],
        isString: { errorMessage: "Uzatmalar qutisi string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Uzatmalar qutisi bo‘sh bo‘lmasligi kerak!" }
    },
    payment: {
        in: ["body"],
        isString: { errorMessage: "To‘lov turi string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "To‘lov turi bo‘sh bo‘lmasligi kerak!" }
    },
    prepayment: {
        in: ["body"],
        isString: { errorMessage: "Oldindan to‘lov string bo‘lishi kerak!" },
        notEmpty: { errorMessage: "Oldindan to‘lov bo‘sh bo‘lmasligi kerak!" }
    }
});
