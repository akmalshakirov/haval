const Joi = require("joi")

exports.oreder_dealer_callSchema = Joi.object({
    diler: Joi.string().required().messages({
        "string.base": "Diler string bo'lishi kerak!",
        "string.empty": "Diler bo'sh bo'lmasligi kerak!",
        "any.required": "Diler talab qilinadi"
    }),
    toliqIsm: Joi.string().min(3).max(20).required().messages({
        "string.base": "Foydalanuvchi nomi string bo'lishi kerak!",
        "string.empty": "Foydalanuvchi nomi bo'sh bo'lmasligi kerak!",
        "string.min": "Foydalanuvchi nomi 3 ta dan kam bo'lmasligi kerak!",
        "string.max": "Foydalanuvchi nomi 20 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Foydalanuvchi nomi talab qilinadi",
    }),    
    phone: Joi.string().required().messages({
        "string.base": "Telefon string bo'lishi kerak!",
        "string.empty": "Telefon bo'sh bo'lmasligi kerak!",
        "any.required": "Telefon talab qilinadi",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email string bo'lishi kerak!",
        "string.empty": "Email bo'sh bo'lishi kerak emas!",
        "string.email": "Email formati noto'g'ri!",
        "any.required": "Email talab qilinadi"
    }),
    savolTuri: Joi.string().required().messages({
        "string.base": "Savol turi string bo'lishi kerak!",
        "string.empty": "Savol turi bo'sh bo'lmasligi kerak!",
        "any.required": "Savol turi talab qilinadi",
    }),
    izoh: Joi.string().required().messages({
        "string.base": "Izoh string bo'lishi kerak!",
        "string.empty": "Izoh bo'sh bo'lmasligi kerak!",
        "any.required": "Izoh talab qilinadi",
    }),
})
