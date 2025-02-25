const { checkSchema } = require("express-validator");

exports.validateDiler = checkSchema({
  title: {
    in: ["body"],
    isString: { errorMessage: "Sarlavha string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Sarlavha bo'sh bo'lmasligi kerak!" },
    isLength: [
      {
        options: { min: 10 },
        errorMessage: "Sarlavha 10 ta belgidan kam bo'lmasligi kerak!"
      },
      {
        options: { max: 150 },
        errorMessage: "Sarlavha 150 ta belgidan ko'p bo'lmasligi kerak!"
      }
    ]
  },
  manzil: {
    in: ["body"],
    isString: { errorMessage: "Manzil string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Manzil bo'sh bo'lmasligi kerak!" }
  },
  workHoursDays: {
    in: ["body"],
    isString: { errorMessage: "Ish kunlari string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Ish kunlari bo'sh bo'lmasligi kerak!" }
  },
  workHoursStart: {
    in: ["body"],
    isString: { errorMessage: "Ish boshlanishi string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Ish boshlanishi bo'sh bo'lmasligi kerak!" }
  },
  workHoursEnd: {
    in: ["body"],
    isString: { errorMessage: "Ish tugashi string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Ish tugashi bo'sh bo'lmasligi kerak!" }
  },
  phone: {
    in: ["body"],
    isString: { errorMessage: "Telefon string bo'lishi kerak!" },
    notEmpty: { errorMessage: "Telefon bo'sh bo'lmasligi kerak!" }
  }
});
