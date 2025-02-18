const fs = require("fs");
const PDFDocument = require("pdfkit");

module.exports = function generatePDF(order) {
  const doc = new PDFDocument();
  const filePath = `./contracts/order_${order._id}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Car Model: ${order.carModel}`);
  doc.text(`Total Price: $${order.totalPrice}`);
  doc.text(`Paid Amount: $${order.paidAmount}`);
  doc.text(`Status: ${order.status}`);
  doc.end();
};
