const Joi = require("joi")

exports.videoSchema = Joi.object({
    title: Joi.string().min(10).max(200).required().messages({
        "string.base": "Sarlavha string bo'lishi kerak!",
        "string.empty": "Sarlavha bo'sh bo'lmasligi kerak!",
        "string.min": "Sarlavha kamida 10 ta belgidan kam bo'lmasligi kerak!",
        "string.max": "Sarlavha 200 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Title talab qilinadi!"
    }),
   video: Joi.string().uri().required().messages({
    "string.base": "Sarlavha string bo'lishi kerak!",
    "string.empty": "Sarlavha bo'sh bo'lmasligi kerak!",
    "any.required": "Title talab qilinadi!"
   })
})