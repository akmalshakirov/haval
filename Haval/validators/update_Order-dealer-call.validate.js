const { checkSchema } = require("express-validator");

exports.validateOrder_Dealer_CallUpdate = checkSchema({
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Yaroqsiz ID format!"
    }
  },
  diler: {
    in: ["body"],
    isString: {
      errorMessage: "Diler string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Diler bo‘sh bo‘lmasligi kerak!"
    }
  },
  toliqIsm: {
    in: ["body"],
    isString: {
      errorMessage: "To‘liq ism string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "To‘liq ism bo‘sh bo‘lmasligi kerak!"
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
      options: [/^\+?\d{9,15}$/], // Telefon raqam formatini tekshirish
      errorMessage: "Telefon raqam noto‘g‘ri formatda!"
    }
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage: "Email string bo‘lishi kerak!"
    },
    isEmail: {
      errorMessage: "Email noto‘g‘ri formatda!"
    },
    notEmpty: {
      errorMessage: "Email bo‘sh bo‘lmasligi kerak!"
    }
  },
  savolTuri: {
    in: ["body"],
    isString: {
      errorMessage: "Savol turi string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Savol turi bo‘sh bo‘lmasligi kerak!"
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