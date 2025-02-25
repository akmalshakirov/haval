const { checkSchema } = require("express-validator");

exports.validateVideo = checkSchema({
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Sarlavha string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Sarlavha bo‘sh bo‘lmasligi kerak!"
    },
    isLength: {
      options: { min: 20 },
      errorMessage: "Sarlavhada 20 ta belgidan kam bo‘lmasligi kerak!"
    },
    isLength: {
      options: { max: 150 },
      errorMessage: "Sarlavha 150 ta belgidan ko‘p bo‘lmasligi kerak!"
    }
  },
  video: {
    in: ["body"],
    isString: {
      errorMessage: "Video string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Video bo‘sh bo‘lmasligi kerak!"
    },
    matches: {
      options: [/^https?:\/\/\S+\.\S+$/],
      errorMessage: "Video uchun yaroqli URL manzil kiriting!"
    }
  }
});
