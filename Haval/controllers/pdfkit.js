const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const { supabase } = require("../config/supabaseClient");
const PDF = require("../models/Order");
const User = require("../models/User");

exports.generate_pdf = async (req, res) => {
  try {
    let requestBody;
    if (typeof req.body.body === "string") {
      requestBody = JSON.parse(req.body.body);
    } else {
      requestBody = req.body;
    }

    const {
      fullname,
      phone,
      model,
      color,
      engine,
      transmission,
      payment,
      userId,
    } = requestBody;

    const lastPdf = await PDF.findOne().sort({ number: -1 });
    let lastNumber = lastPdf?.number ?? 0;
    lastNumber = Number.isInteger(Number(lastNumber)) ? Number(lastNumber) : 0;
    const newNumber = lastNumber + 1;

    console.log("New Number:", newNumber);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 700]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("HAVAL AVTOMOBILINI SOTIB OLISH", {
      x: 50,
      y: 650,
      size: 18,
      font,
    });

    const fields = [
      { label: "Tartib raqami:", value: `#${newNumber}`, y: 630 },
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
      page.drawText(value ? String(value) : "_________", {
        x: 250,
        y,
        size: 12,
        font,
      });
    });

    const pdfBytes = await pdfDoc.save();

    const folderPath = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const filename = `${Date.now()}.pdf`;
    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, pdfBytes);

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .upload(`pdfs/${filename}`, fs.createReadStream(filePath), {
        cacheControl: "3600",
        upsert: false,
        contentType: "application/pdf",
        duplex: "half",
      });

    if (error) throw error;

    const { data: urlData } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET_NAME)
      .getPublicUrl(`pdfs/${filename}`);

    if (!urlData.publicUrl) {
      return res
        .status(500)
        .json({ error: "Supabase URL yaratishda xatolik!" });
    }

    const newPdf = await PDF.create({
      userId,
      number: newNumber,
      filename,
      url: urlData.publicUrl,
      fullname,
      phone,
      model,
      color,
      engine,
      transmission,
      payment,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { orders: newPdf.id } },
      {
        new: true,
      }
    );

    console.log(
      `PDF MongoDB'ga saqlandi: ${filename} (Tartib raqami: #${newNumber})`
    );

    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Faylni o‘chirishda xatolik: ${err.message}`);
          } else {
            console.log(`Fayl o‘chirildi: ${filePath}`);
          }
        });
      }
    }, 15000);

    return res.status(201).json({
      Pdf: newPdf,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "PDF yaratish yoki yuklashda xatolik yuz berdi",
    });
  }
};

exports.download_pdf = async (req, res) => {
  try {
      const { filename } = req.params;
      if (!filename) {
          return res.status(400).json({ error: "Fayl nomi kiritilmagan" });
      }

      const { data } = await supabase.storage
          .from(process.env.SUPABASE_BUCKET_NAME)
          .getPublicUrl(`pdfs/${filename}`);

      if (!data) {
          return res.status(404).json({ error: "Bunday fayl topilmadi" });
      }

      res.json({ url: data.publicUrl });
  } catch (error) {
      console.error("Server xatosi:", error);
      res.status(500).json({ error: "PDF yuklab olishda xatolik yuz berdi" });
  }
};

exports.download_pdf = async (req, res) => {
    try {
        const { filename } = req.params;
        if (!filename) {
            return res.status(400).json({ error: "Fayl nomi kiritilmagan" });
        }

        const { data } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET_NAME)
            .getPublicUrl(`pdfs/${filename}`);

        if (!data) {
            return res.status(404).json({ error: "Bunday fayl topilmadi" });
        }

        res.json({ url: data.publicUrl });
    } catch (error) {
        console.error("Server xatosi:", error);
        res.status(500).json({ error: "PDF yuklab olishda xatolik yuz berdi" });
    }
};
