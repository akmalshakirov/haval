const Joi = require("joi");

const imageValidator = (value, helpers) => {
    const allowedFormats = ["jpg", "jpeg", "png", "gif"];
    const minSize = 100 * 1024;
    const maxSize = 4 * 1024 * 1024;

    const fileExtension = value.filename.split(".").pop().toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
        return helpers.error("any.invalid", {
            message: "Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!",
        });
    }

    if (value.length < minSize) {
        return helpers.error("any.invalid", {
            message: "Rasm hajmi kamida 100 KB bo‘lishi kerak!",
        });
    }

    if (value.length > maxSize) {
        return helpers.error("any.invalid", {
            message: "Rasm hajmi 4 MB dan oshmasligi kerak!",
        });
    }

    return value;
};
exports.newsSchema = Joi.object({
    title: Joi.string().min(10).max(255).required().messages({
        "string.base": "Sarlavha string bo'lishi kerak!",
        "string.empty": "Sarlavha bo'sh bo'lmasligi kerak!",
        "string.min": "Sarlavha kamida 10 ta belgidan kam bo'lmasligi kerak!",
        "string.max": "Sarlavha 255 ta belgidan ko'p bo'lmasligi kerak!",
        "any.required": "Title talab qilinadi!",
    }),
    description: Joi.string().min(200).required().messages({
        "string.base": "Yangilik mazmuni string bo'lishi kerak!",
        "string.empty": "Yangilik mazmuni bo'sh bo'lmasligi kerak!",
        "string.min": "Yangilik mazmuni 100 ta belgidan kam bo'lmasligi kerak!",
        "any.required": "Yangilik mazmuni bo'lishi shart!",
    }),
    image: Joi.binary().custom(imageValidator).required().messages({
        "binary.base": "Rasm binary formatda bo‘lishi kerak!",
        "any.required": "Rasm talab qilinadi",
    }),
});
