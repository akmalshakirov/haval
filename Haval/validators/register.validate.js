const Joi = require("joi")

exports.registerSchema = Joi.object({
    username: Joi.string().min(3).max(20).required().messages({
        "string.base": "Foydalanuvchi nomi string bo'lishi kerak!",
        "string.empty": "Foydalanuvchi nomi bo'sh bo'lmasligi kerak!",
        "string.min": "Foydalanuvchi nomi 3 ta dan kam bo'lmasligi kerak!",
        "string.max": "Foydalanuvchi nomi 20 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Foydalanuvchi nomi talab qilinadi",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email string bo'lishi kerak!",
        "string.empty": "Email bo'sh bo'lishi kerak emas!",
        "string.email": "Email formati noto'g'ri!",
        "any.required": "Email talab qilinadi"
    }),
    password: Joi.string().min(8).required().messages({
        "string.base": "Parol string bo'lishi kerak!",
        "string.empty": "Parol bo'sh bo'lishi kerak emas!",
        "string.min": "Parol 8 ta dan kam bo'lmasligi kerak!",
        "string.max": "Parol 32 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Parol talab qilinadi",
    }),
})