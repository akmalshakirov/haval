const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { validationResult } = require("express-validator");

exports.createAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, adminName, password, role, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (req.user.role !== "superadmin") {
            return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });
        }

        await Admin.create({ adminName, email, password: hashedPassword, role, status });

        return res.status(200).json({ message: "Admin muvaffaqiyatli yaratildi" });
    } catch (error) {
        console.error("Admin yaratishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi" });
    }
};

exports.updateSuperAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi." });
        }

        if (req.user.role !== "superadmin" && req.user.id !== id) {
            return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, adminName, password } = req.body;
        const updateData = { adminName, email };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ message: "Admin muvaffaqiyatli yangilandi", data: updatedAdmin });
    } catch (error) {
        console.error("Adminni yangilashda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }

        if (req.user.role !== "superadmin") {
            return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });
        }

        await Admin.findByIdAndDelete(id);

        return res.status(200).json({ message: "Admin muvaffaqiyatli o‘chirildi." });
    } catch (error) {
        console.error("Adminni o‘chirishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.getAdminLastLogin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findByqId(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }

        if (!req.user || req.user.role !== "superadmin") {
            return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });
        }
 
        return res.status(200).json({
            adminName: admin.adminName,
            lastLogin: admin.lastLogin,
            status: admin.status
        });

    } catch (error) {
        console.error("Oxirgi kirish vaqtini olishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};
