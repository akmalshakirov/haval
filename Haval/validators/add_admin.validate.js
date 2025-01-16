const Joi = require("joi");

exports.adminSchema = Joi.object({
    adminName: Joi.string().max(50).min(2).required().messages({
        "string.base": "Admin nomi string bo'lishi kerak!",
        "string.empty": "Admin nomi bo'sh bo'lmasligi kerak!",
        "string.min": "Admin nomida 2 ta belgidan kam bo'lmasligi kerak!",
        "string.max": "Admin nomi 50 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Admin nomi talab qilinadi!"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email string bo'lishi kerak!",
        "string.email": "Email noto'g'ri formatda!",
        "string.empty": "Email bo'sh bo'lmasligi kerak!",
        "any.required": "Email talab qilinadi!"
    }),
    password: Joi.string().max(20).min(6).required().messages({
        "string.base": "Parol string bo'lishi kerak!",
        "string.empty": "Parol bo'sh bo'lmasligi kerak!",
        "string.min": "Parol 6 ta belgidan kam bo'lmasligi kerak!",
        "string.max": "Parol 20 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Parol talab qilinadi!"
    })
});
