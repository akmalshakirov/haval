const Joi = require("joi")

exports.loginSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.base": "Email string bo'lishi kerak!",
        "string.empty": "Email bo'sh bo'lmasligi kerak!",
        "any.required": "Email talab qilinadi",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Parol string bo'lishi kerak!",
        "string.empty": "Parol bo'sh bo'lishi kerak emas!",
        "string.min": "Parol 6 ta dan kam bo'lmasligi kerak!",
        "string.max": "Parol 32 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Parol talab qilinadi",
    })
})