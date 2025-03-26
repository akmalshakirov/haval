const Order = require("../models/Order");
const User = require("../models/User");

exports.usersQidiruv = async (req, res) => {
  const { name } = req.body;

  try {
    const users = await User.find({ name: new RegExp(name, "i") });

    if (!users.length) {
      return res.status(404).json({ message: "Foydalanuvchilar topilmadi" });
    }

    return res.status(200).json({ message: "Foydalanuvchilar", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.shartnomalarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.body;

    const user = await User.findById(id).populate({
      path: "orders",
      match: { filename: new RegExp(filename, "i") }
    });

    if (!user || !user.orders.length) {
      return res.status(404).json({ message: "Shartnoma topilmadi" });
    }

    return res.status(200).json({ message: "Shartnomangiz", orders: user.orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.shartnomalarAdmin = async (req, res) => {
  try {
    const { filename } = req.body;

    const orders = await Order.find({ filename: new RegExp(filename, "i")});

    if (!orders.length) {
      return res.status(404).json({ message: "Shartnoma topilmadi" });
    }

    return res.status(200).json({ message: "Shartnomalar", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};
