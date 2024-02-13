const Specialty = require("../models/Specialty");

const store = async (req, res) => {
    try {
        const specialty = new Specialty(req.body);
        const saveSpecialty = await specialty.save();

        return res.status(201).json({
        ok: true,
        specialty: saveSpecialty,
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
        const specialties = await Specialty.find({ active: true });
        return res.status(200).json({
        ok: true,
        specialties,
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
        const specialty = await Specialty.findOne({ _id });
        if (!specialty) {
        return res.status(404).json({
            ok: false,
            message: "La especialidad no existe",
        });
        }
        return res.status(200).json({
        ok: true,
        specialty,
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
        const specialty = await Specialty.findByIdAndUpdate({ _id }, req.body, {
        new: true,
        });
        if (!specialty) {
        return res.status(404).json({
            ok: false,
            message: "La especialidad no existe",
        });
        }
        return res.status(200).json({
        ok: true,
        specialty,
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
        const specialty = await Specialty.findByIdAndUpdate(
        { _id },
        {
            active: false,
        },
        {
            new: true,
        }
        );
        if (!specialty) {
        return res.status(404).json({
            ok: false,
            message: "La especialidad no existe",
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
module.exports = { store, getAll, getOne, update, remove };