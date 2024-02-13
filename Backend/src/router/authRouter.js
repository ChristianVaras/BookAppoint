const express = require("express");
const authController = require("../controllers/auth.controller");
const isAuthenticated = require("../middlewares/authJwt");

const authRouter = express.Router();

authRouter.post("/login", authController.loginPatient);
authRouter.post("/register", authController.registerPatient);
authRouter.get(
    "/me",
    isAuthenticated(["patient", "doctor", "admin"]),
    authController.me
);
authRouter.post(
    "/forgot-password",
    authController.forgotPasswordPatient
);
authRouter.post("/reset-password", authController.resetPasswordPatient);

authRouter.post("/staff/login", authController.loginStaff);

module.exports = authRouter;