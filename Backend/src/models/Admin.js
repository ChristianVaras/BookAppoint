const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: "admin",
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;