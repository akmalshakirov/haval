const Joi = require("joi");

const imageValidator = (value, helpers) => {
    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const minSize = 100 * 1024;      
    const maxSize = 4 * 1024 * 1024;  

    const fileExtension = value.filename.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
        return helpers.error('any.invalid', { message: 'Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!' });
    }

    if (value.length < minSize) {
        return helpers.error('any.invalid', { message: 'Rasm hajmi kamida 100 KB bo‘lishi kerak!' });
    }

    if (value.length > maxSize) {
        return helpers.error('any.invalid', { message: 'Rasm hajmi 4 MB dan oshmasligi kerak!' });
    }

    return value; 
};

exports.updatecarSchema = Joi.object({
    year: Joi.number().required().messages({
        "string.base": "Yili number bo'lishi kerak!",
        "string.empty": "Yili bo'sh bo'lmasligi kerak!",
        "any.required": "Yili talab qilinadi"
    }),    
    image: Joi.binary().custom(imageValidator).messages({
        "binary.base": "Rasm binary formatda bo‘lishi kerak!",
    }),    
    model: Joi.string().required().messages({
        "string.base": "Model string bo'lishi kerak!",
        "string.empty": "Model bo'sh bo'lmasligi kerak!",
        "any.required": "Model talab qilinadi"
    }), 
    price: Joi.number().required().messages({
        "string.base": "Narxi number bo'lishi kerak!",
        "string.empty": "Narxi bo'sh bo'lmasligi kerak!",
        "any.required": "Narxi talab qilinadi"
    }),
})