const { checkSchema } = require("express-validator");

exports.validateTest_drayver = checkSchema({
  toliqIsm: {
    in: ["body"],
    isString: {
      errorMessage: "To'liq ism string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "To'liq ism bo‘sh bo‘lmasligi kerak!"
    }
  },
  model: {
    in: ["body"],
    isString: {
      errorMessage: "Model string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Model bo‘sh bo‘lmasligi kerak!"
    }
  },
  phone: {
    in: ["body"],
    isString: {
      errorMessage: "Telefon string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Telefon bo‘sh bo‘lmasligi kerak!"
    },
    matches: {
      options: [/^\+?\d{9,15}$/],
      errorMessage: "Telefon raqam noto‘g‘ri formatda! (Masalan: +998901234567)"
    }
  },
  izoh: {
    in: ["body"],
    isString: {
      errorMessage: "Izoh string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Izoh bo‘sh bo‘lmasligi kerak!"
    }
  }
});
