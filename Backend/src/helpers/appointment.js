const Appointment = require("../models/Appointment");

const getAppointmentsByDoctorAndDate = async (doctorId, date) => {
    return await Appointment.aggregate([
        // Matching appointments by the date and doctor
        {
        $match: {
            appointmentDate: {
            $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            $lt: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            ),
            },
            doctor: doctorId,
        },
        },
    ]);
};
const getAvailableAppointmentSlots = async (doctor, date) => {
    const schedule = doctor.schedule;

    // Dates are created dynamically using startTime and endTime values saved in Schedule model
    const startTime = new Date(`${date.toDateString()} ${schedule.startTime}`);
    const endTime = new Date(`${date.toDateString()} ${schedule.endTime}`);
    const appointmentDuration = schedule.appointmentDuration;

    // Available Appointment Slots
    const availableAppointmentSlots =
        Math.floor((endTime - startTime) / (appointmentDuration * 60000)) -
        (await getAppointmentsByDoctorAndDate(doctor._id, date)).length;

    return availableAppointmentSlots;
};

module.exports = {
    getAvailableAppointmentSlots,
    getAppointmentsByDoctorAndDate,
};