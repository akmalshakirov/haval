const { validationResult } = require("express-validator");
const Order = require("../../models/Order");
const generatePDF = require("../utils/pdfGenerator");

exports.createOrder = async (req, res) => {
  try {
    const { fullname, phone, model, color, engine, transmission, payment, prepayment } = require(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newOrder = await Order.create({
      fullname,
      phone,
      model,
      color,
      engine,
      transmission,
      payment,
      prepayment
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
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.userId = req.user.id; 
    }

    const pendingOrders = await Order.find({ ...query, status: "Pending" });
    const cancelledOrders = await Order.find({ ...query, status: "Cancelled" });

    res.json({
      pending: pendingOrders,
      cancelled: cancelledOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
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
