const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { validationResult } = require("express-validator");

exports.getAllAdmin = async (req, res) => {
    try {

        const admins = await Admin.find();
        return res.status(200).json({ message: "Adminlar", admins });
    } catch (error) {
        console.error("Adminlarni olishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }
        return res.status(200).json(admin);

    } catch (error) {
        console.error("Adminni olishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.createAdmin = async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

        // if (req.user.role !== "superadmin") {
        //     return res.status(403).json({ error: "Faqat superadmin yaratishi mumkin!" });
        // }

        const { email, adminName, password, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({ adminName, email, password: hashedPassword, status });

        return res.status(200).json({ message: "Admin muvaffaqiyatli yaratildi" });
    } catch (error) {
        console.error("Admin yaratishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi" });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi." });
        }

        // if (req.user.role !== "superadmin" && admin._id.toString() !== req.user.id) {
        //     return res.status(403).json({ error: "Siz faqat o‘zingizni yangilay olasiz!" });
        // }

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
        // if (req.user.role !== "superadmin") {
        //     return res.status(403).json({ error: "Faqat superadmin o‘chira oladi!" });
        // }

        const { id } = req.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
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
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }

        if (req.user.role === "superadmin" || (admin._id.toString() === req.user.id && admin.status === 0)) {
            return res.status(200).json({
                adminName: admin.adminName,
                lastLogin: admin.lastLogin,
                status: admin.status
            });
        }

        return res.status(403).json({ error: "Sizga ruxsat yo‘q!" });

    } catch (error) {
        console.error("Oxirgi kirish vaqtini olishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};
