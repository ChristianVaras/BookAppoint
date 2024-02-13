const {
    getAvailableAppointmentSlots,
    getAppointmentsByDoctorAndDate,
} = require("../helpers/appointment");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Specialty = require("../models/Specialty");
const { transporter } = require("../utils/nodemailer");

const store = async (req, res) => {
    try {
        const data = req.body;
        const doctor = await Doctor.findById(data.doctor).populate("schedule");
        if (!doctor) {
            return res.status(404).json({
            ok: false,
            message: "El doctor no existe",
            });
        }
        const patient = await Patient.findById(data.patient);
        if (!patient) {
            return res.status(404).json({
            ok: false,
            message: "El paciente no existe",
            });
        }
        const specialty = await Specialty.findById(data.specialty);
        if (!specialty) {
            return res.status(404).json({
            ok: false,
            message: "La especialidad no existe",
            });
        }
        // Date appointment
        const appointmentDate = new Date(data.appointmentDate);
        // Date today 0h 0m 0s
        const today = new Date().setHours(0, 0, 0, 0);
        if (appointmentDate < today) {
            return res.status(400).json({
            ok: false,
            message: "La fecha del turno no puede ser anterior a la fecha actual",
            });
        }
        const availableAppointmentSlots = await getAvailableAppointmentSlots(
            doctor,
            appointmentDate
        );
        const schedule = doctor.schedule;
        if (availableAppointmentSlots > 0) {
            data.duration = schedule.appointmentDuration;
            const appointment = new Appointment(data);
    
            // Init start time in appointment date
            appointment.appointmentDate = new Date(
            `${appointment.appointmentDate.toDateString()} ${schedule.startTime}`
            );
    
            // Number appointments added
            const numberAppointmentsAdded = (
            await getAppointmentsByDoctorAndDate(doctor._id, appointmentDate)
            ).length;
    
            // Add hour in appointment date
            appointment.appointmentDate.setMinutes(
            appointment.appointmentDate.getMinutes() +
                schedule.appointmentDuration * numberAppointmentsAdded
            );
    
            const saveAppointment = await appointment.save();
            const populatedAppointment = await Appointment.findById(
            saveAppointment._id
            )
            .populate("specialty")
            .populate("doctor");
    
            const date = populatedAppointment.appointmentDate;
    
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const dateFormat = date.toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone,
            });
            return res.status(201).json({
            ok: true,
            appointment: populatedAppointment,
            });
            // await transporter.sendMail({
            //   from: process.env.MAIL_MAIL,
            //   to: patient.email,
            //   subject: "Confirmación Cita Médica",
            //   html: `<p>Hola ${patient.name},</p><p>Tu cita médica se ha generado con exito</p><p><strong>Fecha y hora:</strong> ${dateFormat} hs<br><strong>Doctor:</strong> ${populatedAppointment.doctor.name}<br><strong>Especialidad:</strong> ${populatedAppointment.specialty.name}</p>`,
            // });
        } else {
            res.status(500).json({
            ok: false,
            message: "No hay turnos para es dia",
            });
        }
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "Error del servidor",
                error,
            });
        }
};
const getAllMyAppointments = async (req, res) => {
    try {
        const user =
            (await Patient.findById(req.user._id)) ||
            (await Doctor.findById(req.user._id));
        if (!user) {
            return res.status(404).json({
            ok: false,
            message: "Usuario no encontrado",
            });
        }
        const appointments = await Appointment.find({
            $or: [{ doctor: user._id }, { patient: user._id }],
        })
            .populate("specialty")
            .populate("doctor");
    
        return res.status(200).json({
            ok: true,
            appointments,
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
const getMyPastAppointments = async (req, res) => {
    try {
        const user =
            (await Patient.findById(req.user._id)) ||
            (await Doctor.findById(req.user._id));
        if (!user) {
            return res.status(404).json({
            ok: false,
            message: "Usuario no encontrado",
            });
        }
        const appointments = await Appointment.find({
            $or: [{ doctor: user._id }, { patient: user._id }],
            appointmentDate: { $lt: new Date() },
        })
            .sort({ appointmentDate: -1 })
            .populate("specialty")
            .populate("doctor");
    
        return res.status(200).json({
            ok: true,
            appointments,
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
const getMyUpcomingAppointments = async (req, res) => {
    try {
        const user =
            (await Patient.findById(req.user._id)) ||
            (await Doctor.findById(req.user._id));
        if (!user) {
            return res.status(404).json({
            ok: false,
            message: "Usuario no encontrado",
            });
        }
    
        const appointments = await Appointment.find({
            $or: [{ doctor: user._id }, { patient: user._id }],
            appointmentDate: { $gt: new Date() },
        })
            .sort({ appointmentDate: 1 })
            .populate("specialty")
            .populate("doctor");
    
        return res.status(200).json({
            ok: true,
            appointments,
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
const getAll = async (req, res) => {
    try {
        const appointments = await Appointment.find({ active: true });
        return res.status(200).json({
            ok: true,
            appointments,
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
const getOne = async (req, res) => {
    try {
        const _id = req.params.id;
        const appointment = await Appointment.findOne({ _id });
        if (!appointment) {
            return res.status(404).json({
            ok: false,
            message: "La cita no existe",
            });
        }
        return res.status(200).json({
            ok: true,
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};

const update = async (req, res) => {
    try {
        const _id = req.params.id;
        const appointment = await Appointment.findByIdAndUpdate({ _id }, req.body, {
            new: true,
        });
        if (!appointment) {
            return res.status(404).json({
            ok: false,
            message: "La cita no existe",
            });
        }
        return res.status(200).json({
            ok: true,
            appointment,
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
const remove = async (req, res) => {
    try {
        const _id = req.params.id;
        const appointment = await Appointment.findByIdAndUpdate(
            { _id },
            {
            active: false,
            },
            {
            new: true,
            }
        );
        if (!appointment) {
            return res.status(404).json({
            ok: false,
            message: "La cita no existe",
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Se eliminó exitosamente",
        });
        } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error del servidor",
            error,
        });
    }
};
module.exports = {
    store,
    getAllMyAppointments,
    getMyPastAppointments,
    getMyUpcomingAppointments,
    getAll,
    getOne,
    update,
    remove,
};