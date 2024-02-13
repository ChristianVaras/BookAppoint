const crypto = require("crypto");
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");
const ResetToken = require("../models/ResetToken");
const { createToken } = require("../utils/jwt");
const encriptPass = require("../utils/bcrypt");
const { transporter } = require("../utils/nodemailer");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");

const loginPatient = async (req, res) => {
    const { personalId, password } = req.body;
    console.log(req.body);

    try {
        if (!personalId || !password) {
        return res.status(400).json({
            ok: false,
            message: "Debe proporcionar un ID personal y una contraseña..",
        });
        }
        const patient = await Patient.findOne({ personalId });

        if (!patient) {
        return res.status(403).json({
            ok: false,
            message: "Credenciales Invalidas",
        });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
        return res.status(403).json({
            ok: false,
            message: "Credenciales Invalidas",
        });
        }

        const accessToken = createToken({ _id: patient._id });

        return res.status(200).json({
        ok: true,
        message: "Autenticacion correcta",
        user: patient,
        accessToken,
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
const validatePassword = (password) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&+]{8,}$/;
    return regex.test(password);
};
const registerPatient = async (req, res) => {
    const data = req.body;
    try {
        if (!data.personalId || !data.password) {
        return res.status(400).json({
            ok: false,
            message: "Debe proporcionar un ID personal y una contraseña..",
        });
        }
        if (!validatePassword(data.password)) {
        return res.status(400).json({
            ok: false,
            message:
            "La contraseña no cumple con los requisitos mínimos: al menos 8 caracteres, al menos 1 mayuscula y al menos 1 caracter especial.",
        });
        }
        let foundUser = await Patient.findOne({ personalId: data.personalId });
        if (foundUser) {
        return res.status(400).json({
            ok: false,
            message: "PersonalId ya está registrado.",
        });
        }
        foundUser = await Patient.findOne({ email: data.email });
        if (foundUser) {
        return res.status(400).json({
            ok: false,
            message: "Email ya está registrado.",
        });
        }
        const newUser = new Patient(data);
        newUser.password = await encriptPass(data.password);
        const savedNewUser = await newUser.save();

        return res.status(201).json({
        ok: true,
        message: "Registro Exitoso",
        user: savedNewUser,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};

const me = async (req, res) => {
    try {
        const user =
        (await Patient.findById(req.user._id)) ||
        (await Doctor.findById(req.user._id)) ||
        (await Admin.findById(req.user._id));
        return res.status(200).json({
        ok: true,
        user,
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};
const forgotPasswordPatient = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Patient.findOne({ email });
        if (!user) {
        res.status(404).json({
            ok: false,
            message: "No se encontró el usuario",
        });
        return;
        }

    // Crea un token de restablecimiento de contraseña
    const token = new ResetToken({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
    });
    await token.save();

    // Envía un correo electrónico con el enlace de restablecimiento de contraseña
    const resetUrl = `${process.env.FRONT_URL}/confirmPassword?token=${token.token}`;

    await transporter.sendMail({
        from: process.env.MAIL_MAIL,
        to: user.email,
        subject: "Restablecer contraseña",
        html: `<p>Hola ${user.name},</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Si no solicitaste esto, no hagas nada y tu contraseña permanecerá igual.</p>`,
    });

    res.status(200).json({
        ok: true,
        message: "Se envió un correo electrónico para restablecer la contraseña",
        resetUrl,
    });
    } catch (error) {
    res.status(500).json({
        ok: false,
        message:
        "Error al enviar el correo electrónico de restablecimiento de contraseña",
        error,
    });
    }
};
const resetPasswordPatient = async (req, res) => {
    try {
        const { token, password } = req.body;

        // Busca el token
        const tokenDoc = await ResetToken.findOne({ token });

        if (!tokenDoc) {
        res.status(404).json({
            ok: false,
            message: "El token no es válido o ha expirado",
        });
        return;
        }

        // Busca al usuario y actualiza la contraseña
        let user = await Patient.findById(tokenDoc.userId);
        if (!user) {
        res.status(404).json({
            ok: false,
            message: "No se encontró el usuario",
        });
        return;
        }
        const encriptPassword = await encriptPass(password);
        user = await Patient.findByIdAndUpdate(
        tokenDoc.userId,
        {
            password: encriptPassword,
        },
        { new: true }
        );

        // Elimina el token
        await ResetToken.deleteOne({ token: tokenDoc.token });

        return res.status(200).json({
        ok: true,
        message: "Se restableció la contraseña con éxito",
        });
    } catch (error) {
        return res.status(500).json({
        ok: false,
        message: "Error del servidor",
        error,
        });
    }
};

const loginStaff = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
        return res.status(400).json({
            ok: false,
            message: "Debe proporcionar un email y una contraseña..",
        });
        }
        const user =
        (await Admin.findOne({ email })) ||
        (await Doctor.findOne({
            $or: [{ email }, { personalId: email }],
        }));

        if (!user) {
        return res.status(403).json({
            ok: false,
            message: "Credenciales Invalidas",
        });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(403).json({
            ok: false,
            message: "Credenciales Invalidas",
        });
        }

        const accessToken = createToken({ _id: user._id });

        return res.status(200).json({
        ok: true,
        message: "Autenticacion correcta",
        user,
        accessToken,
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
    loginPatient,
    registerPatient,
    me,
    forgotPasswordPatient,
    resetPasswordPatient,
    loginStaff,
};