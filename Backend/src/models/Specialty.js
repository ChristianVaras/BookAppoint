const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialtySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Specialty", specialtySchema);