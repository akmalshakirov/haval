const Order = require("../../models/Order");
const generatePDF = require("../utils/pdfGenerator");
const { pdfSchema } = require("../../validators/pfkit");

exports.createOrder = async (req, res) => {
  try {
     const { value, error } = pdfSchema.validate(req.body);

    const newOrder = await Order.create({
      fullname: value.fullname,
      phone: value.phone,
      model: value.model,
      color: value.color,
      engine: value.engine,
      transmission: value.transmission,
      payment: value.payment,
      prepayment: value.prepayment
    });
 
    return res.status(200).send({
      message: 'Muvaffaqiyatli qo\'shildi',
      newOrder,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Xatolik yuz berdi' });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId });
  res.json(orders);
};

exports.makePayment = async (req, res) => {
  const { orderId, amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: "Invalid payment amount" });

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.paidAmount += amount;
  if (order.paidAmount >= order.totalPrice) {
    order.status = "Paid";
    await generatePDF(order); 
  }

  await order.save();
  res.json(order);
};
