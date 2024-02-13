const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
        validator: function (v) {
            const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        trim: true,
    },
    personalId: {
        type: String,
        validate: {
        validator: function (v) {
            return /^\d{8}$/.test(v);
        },
        message: (props) =>
            `${props.value} is not a valid personal ID number. Must contain 8 digits.`,
        },
        required: true,
        unique: true,
    },
    birthDay: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    nationality: {
        type: String,
        required: true,
    },
    cp: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: "patient",
    },
});

module.exports = mongoose.model("Patient", patientSchema);