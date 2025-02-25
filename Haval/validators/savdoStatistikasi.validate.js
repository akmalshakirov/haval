const { checkSchema } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; 
const maxSize = 4 * 1024 * 1024;

exports.validateSavdoStatistikasi = checkSchema({
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
      errorMessage: "Sarlavha kamida 20 ta belgidan iborat bo‘lishi kerak!"
    },
    isLength: {
      options: { max: 150 },
      errorMessage: "Sarlavha 150 ta belgidan ko‘p bo‘lmasligi kerak!"
    }
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Matn string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Matn bo‘sh bo‘lmasligi kerak!"
    },
    isLength: {
      options: { min: 50 },
      errorMessage: "Matn kamida 50 ta belgidan iborat bo‘lishi kerak!"
    },
    isLength: {
      options: { max: 250 },
      errorMessage: "Matn 250 ta belgidan ko‘p bo‘lmasligi kerak!"
    }
  },
  image: {
    custom: {
      options: (value, { req }) => {
        if (!req.file) {
          throw new Error("Rasm talab qilinadi!");
        }

        const file = req.file;
        const fileExtension = file.originalname.split(".").pop().toLowerCase();
        if (!allowedFormats.includes(fileExtension)) {
          throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
        }

        if (file.size < minSize) {
          throw new Error("Rasm hajmi kamida 100 KB bo‘lishi kerak!");
        }

        if (file.size > maxSize) {
          throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
        }

        return true;
      }
    }
  }
});
