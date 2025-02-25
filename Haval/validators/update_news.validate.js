const { checkSchema } = require("express-validator");

const allowedFormats = ["jpg", "jpeg", "png", "gif"];
const minSize = 100 * 1024;
const maxSize = 4 * 1024 * 1024; 

exports.validateNewsUpdate = checkSchema({
  id: {
    in: ["params"],
    isMongoId: {
      errorMessage: "Yaroqsiz ID format!"
    }
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Sarlavha string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Sarlavha bo‘sh bo‘lmasligi kerak!"
    }
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Matn string bo‘lishi kerak!"
    },
    notEmpty: {
      errorMessage: "Matn bo‘sh bo‘lmasligi kerak!"
    }
  },
  image: {
    in: ["body"],
    optional: true, 
    custom: {
      options: (_, { req }) => {
        if (!req.file) return true; 

        const { originalname, size } = req.file;
        const fileExtension = originalname.split(".").pop().toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
          throw new Error("Faqat JPG, JPEG, PNG yoki GIF formatlari ruxsat etiladi!");
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
