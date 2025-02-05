const Joi = require("joi");

exports.carSchema = Joi.object({
    // title: Joi.string().min(10).max(255).required().messages({
    //     "string.base": "Sarlavha string bo'lishi kerak!",
    //     "string.empty": "Sarlavha bo'sh bo'lmasligi kerak!",
    //     "string.min": "Sarlavha kamida 10 ta belgidan kam bo'lmasligi kerak!",
    //     "string.max": "Sarlavha 255 ta belgidan ko'p bo'lmasligi kerak!",
    //     "any.required": "Title talab qilinadi!"
    // }),
    // description: Joi.string().min(200).required().messages({
    //     "string.base": "Yangilik mazmuni string bo'lishi kerak!",
    //     "string.empty": "Yangilik mazmuni bo'sh bo'lmasligi kerak!",
    //     "string.min": "Yangilik mazmuni 100 ta belgidan kam bo'lmasligi kerak!",
    //     "any.required": "Yangilik mazmuni bo'lishi shart!",
    // }),
    year: Joi.number().required().messages({
        "string.base": "Yili number bo'lishi kerak!",
        "string.empty": "Yili bo'sh bo'lmasligi kerak!",
        "any.required": "Yili talab qilinadi",
    }),
    image: Joi.binary().messages({
        "binary.base": "Rasm binary formatda bo‘lishi kerak!",
        // "any.required": "Rasm yuklanishi shart!",
    }),
    model: Joi.string().required().messages({
        "string.base": "Model string bo'lishi kerak!",
        "string.empty": "Model bo'sh bo'lmasligi kerak!",
        "any.required": "Model talab qilinadi",
    }),
    price: Joi.number().required().messages({
        "string.base": "Narxi number bo'lishi kerak!",
        "string.empty": "Narxi bo'sh bo'lmasligi kerak!",
        "any.required": "Narxi talab qilinadi",
    }),
});
