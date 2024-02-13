const Doctor = require("../models/Doctor");
const crypto = require("crypto");
const encriptPass = require("../utils/bcrypt");
const { transporter } = require("../utils/nodemailer");
const {
    store: storeSchedule,
    update: updateSchedule,
} = require("../controllers/schedule.controller");
const convertWeeklyScheduleToMonthCalendar = require("../middlewares/calendar");
const store = async (req, res) => {
    try {
        const data = req.body;
        if (!data.personalId) {
        return res.status(400).json({
            ok: false,
            message: "Debe proporcionar un ID personal",
        });
        }
        let foundDoctor = await Doctor.findOne({ personalId: data.personalId });
        if (foundDoctor) {
        return res.status(400).json({
            ok: false,
            message: "PersonalId ya está registrado.",
        });
        }
        foundDoctor = await Doctor.findOne({ email: data.email });
        if (foundDoctor) {
        return res.status(400).json({
            ok: false,
            message: "Email ya está registrado.",
        });
        }
        const doctor = new Doctor(data);
        // Se crea y guarda el horario
        doctor.schedule = await storeSchedule(req, res);
        // genera una password aleatoria
        const password = crypto.randomBytes(10).toString("hex");
        doctor.password = await encriptPass(password);
        const saveDoctor = await doctor.save();

        // await transporter.sendMail({
        //   from: process.env.MAIL_MAIL,
        //   to: doctor.email,
        //   subject: "Confirmación Creacion de Cuenta",
        //   html: `<p>Hola ${doctor.name},</p><p>Tus crendenciales son las siguientes</p><p><strong>PersonalId:</strong> ${doctor.personalId}<br><strong>Password:</strong> ${password}</p>`,
        // });
        return res.status(201).json({
        ok: true,
        message: `Se ha guardado con exito la cuenta de ${doctor.name} con el personalId de ${doctor.personalId} `,
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};

const getCalendar = async (req, res) => {
    try {
        const id = req.params.id;

        const doctor = await Doctor.findById(id).populate("schedule");
        if (!doctor) {
        return res.status(404).json({
            ok: false,
            message: "El doctor no existe",
        });
        }
        const calendar = await convertWeeklyScheduleToMonthCalendar(doctor);

        return res.status(200).json({
        ok: true,
        calendar,
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
        const doctor = await Doctor.findOne({ _id })
        .populate({
            path: "specialties",
        })
        .populate("schedule");
        if (!doctor) {
        return res.status(404).json({
            ok: false,
            message: "El doctor no existe",
        });
        }
        return res.status(200).json({
        ok: true,
        doctor,
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
const getOneBySpecialty = async (req, res) => {
    try {
        const { idSpecialty } = req.params;
        const doctors = await Doctor.find({ specialties: idSpecialty })
        .populate({
            path: "specialties",
        })
        .populate("schedule");

        return res.status(200).json({
        ok: true,
        doctors,
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
        const doctors = await Doctor.find({ active: true })
        .populate({
            path: "specialties",
        })
        .populate("schedule");
        return res.status(200).json({
        ok: true,
        doctors,
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
        const doctor = await Doctor.findByIdAndUpdate({ _id }, req.body, {
        new: true,
        });
        doctor.schedule = await updateSchedule(req.body.schedule, res);
        if (!doctor) {
        return res.status(404).json({
            ok: false,
            message: "El doctor no existe",
        });
        }
        return res.status(200).json({
        ok: true,
        doctor,
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
        const doctor = await Doctor.findByIdAndUpdate(
        { _id },
        { active: false },
        {
            new: true,
        }
        );
        if (!doctor) {
        return res.status(404).json({
            ok: false,
            message: "El doctor no existe",
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
    getCalendar,
    getOne,
    getOneBySpecialty,
    getAll,
    update,
    remove,
};