const Joi = require("joi")

exports.parolSchema = Joi.object({
    password: Joi.string().max(20).min(6).required().messages({
        "string.base": "Parol string bo'lishi kerak!",
        "string.empty": "Parol bo'sh bo'lmasligi kerak!",
        "string.min": "Parol 6 ta belgidan kam bo'lmasligi kerak!",
        "string.max": "Parol 20 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Parol talab qilinadi!"
    })
})

