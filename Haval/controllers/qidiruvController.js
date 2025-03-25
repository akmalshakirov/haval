const Order = require("../models/Order");
const User = require("../models/User");

exports.usersQidiruv = async (req, res) => {
  const { name } = require(req.body);
  try {
    const users = await User.find(name);

    res.status(404).json({ message: "Foydalanuvchilar topilmadi" });

    return res.status(200).json({ message: "Foydalanuvchiar", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.shartnomalarUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("orders");

    return res.status(200).send("Shartnomangiz",user);
  } catch (error) {
    console.console.log(error);
    return res.status(500).json({ error: "Server xatosi yuz berdi." });
  }
};

exports.shartnomalarAdmin = async (req, res) => {
    try {
        const { fullname } = require(req.body);
        const admin = await Order.find(fullname)

        return res.status(200).json({ message: "Shartnoma", admin });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};
