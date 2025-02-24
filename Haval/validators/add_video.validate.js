const { body, param } = require("express-validator");

const validateVideo = [
    body("title")
        .isString().withMessage("Sarlavha string bo'lishi kerak!")
        .notEmpty().withMessage("Sarlavha bo'sh bo'lmasligi kerak!")
        .isLength({ min: 20 }).withMessage("Sarlavhada 20 ta belgidan kam bo'lmasligi kerak!")
        .isLength({ max: 150 }).withMessage("Sarlavha 150 ta belgidan ko'p bo'lmasligi kerak!"),

    
    body("video")
        .isString().withMessage("Video string bo‘lishi kerak!")
        .notEmpty().withMessage("Video bo'sh bo'lmasligi kerak!")


];

module.exports = validateVideo;
