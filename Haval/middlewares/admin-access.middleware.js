const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.adminAccessMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token topilmadi!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; 

        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }

        next();
    } catch (error) {
        console.error("Auth xatosi:", error);
        return res.status(401).json({ error: "Noto‘g‘ri yoki eskirgan token!" });
    }
};
