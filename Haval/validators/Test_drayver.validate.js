const Joi = require("joi")

exports.oreder_dealer_callSchema = Joi.object({
    toliqIsm: Joi.string().min(3).max(20).required().messages({
        "string.base": "Foydalanuvchi nomi string bo'lishi kerak!",
        "string.empty": "Foydalanuvchi nomi bo'sh bo'lmasligi kerak!",
        "string.min": "Foydalanuvchi nomi 3 ta dan kam bo'lmasligi kerak!",
        "string.max": "Foydalanuvchi nomi 20 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Foydalanuvchi nomi talab qilinadi",
    }),   
    model: Joi.string().required().messages({
        "string.base": "Model string bo'lishi kerak!",
        "string.empty": "Model bo'sh bo'lmasligi kerak!",
        "any.required": "Model talab qilinadi"
    }), 
    phone: Joi.string().required().messages({
        "string.base": "Telefon string bo'lishi kerak!",
        "string.empty": "Telefon bo'sh bo'lmasligi kerak!",
        "any.required": "Telefon talab qilinadi",
    }),
    izoh: Joi.string().required().messages({
        "string.base": "Izoh string bo'lishi kerak!",
        "string.empty": "Izoh bo'sh bo'lmasligi kerak!",
        "any.required": "Izoh talab qilinadi",
    }),
})
