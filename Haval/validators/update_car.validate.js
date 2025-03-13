const { checkSchema } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 10 * 1024; 
const maxSize = 4 * 1024 * 1024;

exports.validateCarUpdate = checkSchema({
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Yaroqsiz ID format!"
    }
  },
  year: {
    in: ["body"],
    isInt: {
      errorMessage: "Yili raqam bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Yili bo‘sh bo‘lmasligi kerak!"
    }
  },
  model: {
    in: ["body"],
    isString: {
      errorMessage: "Model matn bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Model bo‘sh bo‘lmasligi kerak!"
    }
  },
  price: {
    in: ["body"],
    isFloat: {
      options: { min: 0 },
      errorMessage: "Narxi musbat son bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Narxi bo‘sh bo‘lmasligi kerak!"
    }
  },
  image: {
    custom: {
      options: (_, { req }) => {
        if (!req.file) return true;

        const { originalname, size } = req.file;
        const fileExtension = originalname.split(".").pop().toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
          throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
        }

        if (size < minSize) {
          throw new Error("Rasm hajmi kamida 10 KB bo‘lishi kerak!");
        }

        if (size > maxSize) {
          throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
        }

        return true;
      }
    }
  }
});
