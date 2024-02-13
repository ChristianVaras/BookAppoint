const Admin = require("../models/Admin");
const encriptPass = require("../utils/bcrypt");

const store = async (req, res) => {
    try {
        const data = req.body;
        const newAdmin = new Admin(data);
        newAdmin.password = await encriptPass(data.password);
        const saveNewAdmin = await newAdmin.save();

        return res.status(201).json({
        ok: true,
        user: saveNewAdmin,
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
module.exports = { store };