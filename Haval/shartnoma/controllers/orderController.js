const Order = require("../../models/Order");
const generatePDF = require("../utils/pdfGenerator");

exports.createOrder = async (req, res) => {
  const { carModel, totalPrice } = req.body;
  const order = new Order({ userId: req.user.userId, carModel, totalPrice });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
