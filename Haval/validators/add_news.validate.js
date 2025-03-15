const { checkSchema } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024; 
const maxSize = 4 * 1024 * 1024; 

exports.validateNews = checkSchema({
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
      errorMessage: "Sarlavha 20 ta belgidan kam bo‘lmasligi kerak!"
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
      errorMessage: "Matn 50 ta belgidan kam bo‘lmasligi kerak!"
    },
    isLength: {
      options: { max: 550 },
      errorMessage: "Matn 550 ta belgidan ko‘p bo‘lmasligi kerak!"
    }
  },
  image: {
    in: ["body"],
    custom: {
      options: (_, { req }) => {
        if (!req.file) {
          throw new Error("Rasm talab qilinadi!");
        }

        const { originalname, size } = req.file;
        const fileExtension = originalname.split(".").pop().toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
          throw new Error(
            "Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!"
          );
        }

        if (size < minSize) {
          throw new Error("Rasm hajmi kamida 100 KB bo‘lishi kerak!");
        }

        if (size > maxSize) {
          throw new Error("Rasm hajmi 4 MB dan oshmasligi kerak!");
        }

        return true;
      }
    }
  }
});
