const Joi = require("joi")

exports.pdfSchema = Joi.object({
    fullname: Joi.string().min(2).max(20).required().messages({
        "string.base": "Foydalanuvchi nomi string bo'lishi kerak!",
        "string.empty": "Foydalanuvchi nomi bo'sh bo'lmasligi kerak!",
        "string.min": "Foydalanuvchi nomi 2 ta dan kam bo'lmasligi kerak!",
        "string.max": "Foydalanuvchi nomi 20 ta dan ko'p bo'lmasligi kerak!",
        "any.required": "Foydalanuvchi nomi talab qilinadi",
    }),   
    phone: Joi.string().required().messages({
        "string.base": "Telefon string bo'lishi kerak!",
        "string.empty": "Telefon bo'sh bo'lmasligi kerak!",
        "any.required": "Telefon talab qilinadi",
    }),
    model: Joi.string().required().messages({
        "string.base": "Model string bo'lishi kerak!",
        "string.empty": "Model bo'sh bo'lmasligi kerak!",
        "any.required": "Model talab qilinadi"
    }), 
    color: Joi.string().required().messages({
        "string.base": "Rangi string bo'lishi kerak!",
        "string.empty": "Rangi bo'sh bo'lmasligi kerak!",
        "any.required": "Rangi talab qilinadi",
    }),
    engine: Joi.string().required().messages({
        "string.base": "Dvigatel hajmi string bo'lishi kerak!",
        "string.empty": "Dvigatel hajmi bo'sh bo'lmasligi kerak!",
        "any.required": "Dvigatel hajmi talab qilinadi",
    }),
    transmission: Joi.string().required().messages({
        "string.base": "Uzatmalar qutisi string bo'lishi kerak!",
        "string.empty": "Uzatmalar qutisi bo'sh bo'lmasligi kerak!",
        "any.required": "Uzatmalar qutisi talab qilinadi",
    }),
    payment: Joi.string().required().messages({
        "string.base": "To‘lov turi string bo'lishi kerak!",
        "string.empty": "To‘lov turi bo'sh bo'lmasligi kerak!",
        "any.required": "To‘lov turi talab qilinadi",
    }),
    prepayment: Joi.string().required().messages({
        "string.base": "Oldindan to‘lov string bo'lishi kerak!",
        "string.empty": "Oldindan to‘lov bo'sh bo'lmasligi kerak!",
        "any.required": "Oldindan to‘lov talab qilinadi",
    }),
})

