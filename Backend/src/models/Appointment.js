const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    specialty: {
        type: Schema.Types.ObjectId,
        ref: "Specialty",
        require: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    duration: {
        // duration in minutes
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Appointment", appointmentSchema);