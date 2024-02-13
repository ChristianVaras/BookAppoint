const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const { verifyToken } = require("../utils/jwt");

const isAuthenticated = (allowesRoles) => {
    return async (req, res, next) => {
        try {
        const authorization = req.headers["authorization"];

        if (!authorization) {
            return failure({
            res,
            status: 403,
            message: "🚫 Token missing or invalid 🚫",
            });
        }
        const token = authorization.split(" ")[1];
        const decodedToken = await verifyToken(token);
        const user =
            (await Patient.findById(decodedToken._id)) ||
            (await Doctor.findById(decodedToken._id)) ||
            (await Admin.findById(decodedToken._id));

        if (!decodedToken) {
            return res.status(401).json({
            ok: false,
            message: "🚫 Un-Authorized 🚫",
            });
        }
        if (!user || !allowesRoles.includes(user.rol)) {
            return res.status(403).json({
            ok: false,
            message: "🚫 Un-Authorized 🚫",
            });
        }
        req.user = user;
        next();
        } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
            ok: false,
            message: "🚫 Token Expired 🚫",
            });
        }
        return res.status(401).json({
            ok: false,
            message: "🚫 Un-Authorized 🚫",
        });
        }
    };
};
module.exports = isAuthenticated;