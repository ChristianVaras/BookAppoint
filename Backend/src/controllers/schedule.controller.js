const Schedule = require("../models/Schedule");

const store = async (req, res) => {
    try {
        const { daysOfWeek, appointmentDuration, startTime, endTime } = req.body;
        const newSchedule = new Schedule({
        daysOfWeek,
        appointmentDuration,
        startTime,
        endTime,
        });
        const saveNewSchedule = await newSchedule.save();

        return saveNewSchedule._id;
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
const update = async (data, res) => {
    try {
        const _id = data._id;
        const schedule = await Schedule.findByIdAndUpdate({ _id }, data, {
        new: true,
        });
        if (!schedule) {
        return res.status(404).json({
            ok: false,
            message: "El horario no existe",
        });
        }
        return schedule._id;
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
module.exports = { store, update };