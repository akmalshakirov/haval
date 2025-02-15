const express = require("express");
const PDFDocument = require("pdfkit");
const { getGFS } = require("../models/db");

const router = express.Router();

const create_pdf = async (req, res) => {
  const gfs = getGFS();
  if (!gfs) return res.status(500).json({ error: "MongoDB hali ulanmagan" });

  const { fullName, birthDate, address, phone, purpose } = req.body;
  const fileName = `ariza_${fullName.replace(" ", "_")}_${Date.now()}.pdf`;

  const doc = new PDFDocument();
  const writestream = gfs.openUploadStream(fileName, { contentType: "application/pdf" });

  doc.pipe(writestream);
  doc.fontSize(18).text("Ariza", { align: "center", underline: true });
  doc.moveDown();
  doc.fontSize(14).text(`F.I.O: ${fullName}`);
  doc.text(`Tug‘ilgan sana: ${birthDate}`);
  doc.text(`Manzil: ${address}`);
  doc.text(`Telefon: ${phone}`);
  doc.text(`Maqsad: ${purpose}`);
  doc.moveDown();
  doc.text("Imzo: ___________________________", { align: "left" });
  doc.end();

  writestream.on("finish", () => {
    res.json({ message: "Ariza muvaffaqiyatli yaratildi!", fileName });
  });
}

const download_pdf = ("/download-pdf/:filename", async (req, res) => {
  const gfs = getGFS();
  if (!gfs) return res.status(500).json({ error: "MongoDB hali ulanmagan" });

  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "Fayl topilmadi" });
    }

    res.setHeader("Content-Disposition", `attachment; filename="${file[0].filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Fayl yuklab olinmadi" });
  }
});

module.exports = { create_pdf, download_pdf}
