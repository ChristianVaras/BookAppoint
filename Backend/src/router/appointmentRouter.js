const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const isAuthenticated = require("../middlewares/authJwt");

const appointmentRouter = express.Router();

appointmentRouter.post(
    "/",
    isAuthenticated(["patient", "admin"]),
    appointmentController.store
);
appointmentRouter.get(
    "/me",
    isAuthenticated(["patient", "doctor", "admin"]),
    appointmentController.getAllMyAppointments
);  
appointmentRouter.get(
    "/me/past",
    isAuthenticated(["patient", "doctor", "admin"]),
    appointmentController.getMyPastAppointments
);
appointmentRouter.get(
    "/me/upcoming",
    isAuthenticated(["patient", "doctor", "admin"]),
    appointmentController.getMyUpcomingAppointments
);
appointmentRouter.get(
    "/",
    isAuthenticated(["patient", "doctor", "admin"]),
    appointmentController.getAll
);
appointmentRouter.get(
    "/:id",
    isAuthenticated(["patient", "doctor", "admin"]),
    appointmentController.getOne
);
appointmentRouter.put(
    "/:id",
    isAuthenticated(["admin"]),
    appointmentController.update
);
appointmentRouter.delete(
    "/:id",
    isAuthenticated(["patient", "admin"]),
    appointmentController.remove
);

module.exports = appointmentRouter;