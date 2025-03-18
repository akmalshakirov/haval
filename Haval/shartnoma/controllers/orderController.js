const { validationResult } = require("express-validator");
const Order = require("../../models/Order");
const { default: mongoose } = require("mongoose");

exports.createOrder = async (req, res) => {
  try {
    const {
      fullname,
      phone,
      model,
      color,
      engine,
      transmission,
      payment,
      prepayment,
    } = require(req.body);

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
      prepayment,
    });

    return res.status(200).send({
      message: "Muvaffaqiyatli qo'shildi",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Xatolik yuz berdi" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server xatosi" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Yaroqsiz ID" });
  }

  try {
    const deletedOrder = await Order.findById(id);

    if (!deletedOrder) {
    } else {
      res.status(404).json({ message: "Order topilmadi" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.user.role !== "superadmin") {
      return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });
    }
    await Order.findByIdAndDelete(id);

    return res.status(200).json({ message: "Order muvaffaqiyatli o'chirildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order o'chirishda xatolik yuz berdi" });
  }
};

exports.makePayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    
    if (order.status === "Pending") {
    order.status = "Paid";
    await order.save();
      return res.status(400).json({ message: "Order is already paid!" });
    }


    return res
      .status(200)
      .json({ message: "Status updated to Paid", result: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Serverda xatolik yuz berdi!" });
  }
};