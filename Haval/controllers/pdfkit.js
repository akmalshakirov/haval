const { PDFDocument, StandardFonts } = require("pdf-lib");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { db, getGFS } = require("../config/db");
const PDF = require("../models/Order");

let gfs;
db().then(() => {
  gfs = getGFS();
  console.log("GridFS tayyor!");
}).catch(err => console.error("Ulanishda xatolik:", err));

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => ({
    filename: file.originalname,
    bucketName: "pdfs",
  }),
});
const upload = multer({ storage });

exports.generate_pdf = async (req, res) => {
  try {
    const { fullname, phone, model, color, engine, transmission, payment } = req.body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("HAVAL AVTOMOBILINI SOTIB OLISH", { x: 50, y: 650, size: 18, font });

    const fields = [
      { label: "Ism, Familiya:", value: fullname, y: 600 },
      { label: "Telefon raqami:", value: phone, y: 570 },
      { label: "Tanlangan model:", value: model, y: 540 },
      { label: "Rangi:", value: color, y: 510 },
      { label: "Dvigatel hajmi:", value: engine, y: 480 },
      { label: "Uzatmalar qutisi:", value: transmission, y: 450 },
      { label: "To‘lov turi:", value: payment, y: 420 },
    ];

    fields.forEach(({ label, value, y }) => {
      page.drawText(label, { x: 50, y, size: 12, font });
      page.drawText(value || "_________", { x: 250, y, size: 12, font });
    });

    const pdfBytes = await pdfDoc.save();
    const filename = `Haval_Form_${Date.now()}.pdf`;

    const pdfMeta = new PDF({
      filename,
      metadata: { fullname, phone, model, color, engine, transmission, payment }
    });
    await pdfMeta.save();

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "pdfs" });
    const uploadStream = bucket.openUploadStream(filename);
    uploadStream.end(pdfBytes);

    uploadStream.on("finish", () => {
      res.json({ filename });
    });

    uploadStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ error: "PDF saqlashda xatolik" });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
};

exports.download_pdf = async (req, res) => {
  try {
    const { filename } = req.params;
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "pdfs" });

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    const readStream = bucket.openDownloadStreamByName(filename);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "PDF yuklab olishda xatolik" });
  }
};
