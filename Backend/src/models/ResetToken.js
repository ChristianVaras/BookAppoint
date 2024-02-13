const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // el token expira en 5m
    },
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);