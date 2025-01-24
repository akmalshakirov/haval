const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const { adminSchema } = require("../validators/add_admin.validate.js");

exports.getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();

        if (!admins) {
            return res.status(404).send({ error: "Adminlar topilmadi!" });
        }

        return res.status(200).send({
            message: "Adminlar",
            admins,
        });
    } catch (error) {
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).send({ error: "Admin topilmadi!" });
        }

        if (!admin) {
            return res.status(404).send({ error: "Admin topilmadi!" });
        }
        return res.status(200).send(admin);
    } catch (error) {
        console.error("Adminni olishda xato:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { value, error } = adminSchema.validate(req.body);

        const hashedPassword = await bcrypt.hash(value.password, 10);

        await Admin.create({
            adminName: value.adminName,
            email: value.email,
            password: hashedPassword,
        });

        return res
            .status(200)
            .json({ message: "Admin muvaffaqiyatli yaratildi" });
    } catch (error) {
        console.error("Admin yaratishda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi" });
    }
};

exports.updateAdmin = async (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    try {
        const oldAdmin = await Admin.findById(id);
        if (!oldAdmin) {
            return res.status(404).json({ error: "Admin topilmadi." });
        }

        const { value, error } = adminSchema.validate(body);

        const hashedPassword = await bcrypt.hash(value.password, 10);

      if(value.password){
            const admin = {
                adminName: value.adminName,
                email: value.email,
                password: hashedPassword,
            };
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin);

        return res.status(200).json({
            message: "Admin muvaffaqiyatli yangilandi",
            data: updatedAdmin,
        });
        
        } else {
            const admin = {
                adminName: value.adminName,
                email: value.email
            }
        const updatedAdmin = await Admin.findByIdAndUpdate(id, admin);    
        
        return res.status(200).json({
            message: "Admin muvaffaqiyatli yangilandi",
            data: updatedAdmin,
        });        
        }        

    } catch (error) {
        console.error("Adminni yangilashda xatolik:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: "Admin topilmadi!" });
        }

        await Admin.findByIdAndDelete(id);

        return res
            .status(200)
            .json({ message: "Admin muvaffaqiyatli o'chirildi." });
    } catch (error) {
        console.error("Adminni o'chirishda xato:", error);
        return res.status(500).json({ error: "Server xatosi yuz berdi." });
    }
};
