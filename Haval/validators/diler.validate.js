const Joi = require("joi")

exports.dilerSchema = Joi.object({
   title: Joi.string().min(10).max(150).required().messages({
           "string.base": "Sarlavha string bo'lishi kerak!",
           "string.empty": "Sarlavha bo'sh bo'lmasligi kerak!",
           "string.min": "Sarlavha kamida 10 ta belgidan kam bo'lmasligi kerak!",
           "string.max": "Sarlavha 150 ta belgidan ko'p bo'lmasligi kerak!",
           "any.required": "Title talab qilinadi!"
       }),
    manzil: Joi.string().required().messages({
        "string.base": "Manzil string bo'lishi kerak!",
        "string.empty": "Manzil bo'sh bo'lmasligi kerak!",
        "any.required": "Manzil talab qilinadi"
    }),
    workHoursDays: Joi.string().required().messages({
        "string.base": "Ish kunlari string bo'lishi kerak!",
        "string.empty": "Ish kunlari bo'sh bo'lmasligi kerak!",
        "any.required": "Ish kunlari talab qilinadi"
    }),
    workHoursStart: Joi.string().required().messages({
        "string.base": "Ish boshlanishi string bo'lishi kerak!",
        "string.empty": "Ish boshlanishi bo'sh bo'lmasligi kerak!",
        "any.required": "Ish boshlanishi talab qilinadi"
    }),
    workHoursEnd: Joi.string().required().messages({
        "string.base": "Ish tugashi string bo'lishi kerak!",
        "string.empty": "Ish tugashi bo'sh bo'lmasligi kerak!",
        "any.required": "Ish tugashi talab qilinadi"
    }),
    phone: Joi.string().required().messages({
        "string.base": "Telefon string bo'lishi kerak!",
        "string.empty": "Telefon bo'sh bo'lmasligi kerak!",
        "any.required": "Telefon talab qilinadi",
    })
})