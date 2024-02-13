const express = require("express");
const doctorController = require("../controllers/doctor.controller");
const isAuthenticated = require("../middlewares/authJwt");

const doctorRouter = express.Router();

doctorRouter.post("/", isAuthenticated(["admin"]), doctorController.store);
doctorRouter.get(
    "/:id/calendar/",
    isAuthenticated(["patient", "admin"]),
    doctorController.getCalendar
);
doctorRouter.get(
    "/",
    isAuthenticated(["patient", "admin"]),
    doctorController.getAll
);
doctorRouter.get(
    "/specialty/:idSpecialty",
    isAuthenticated(["patient", "admin"]),
    doctorController.getOneBySpecialty
);
doctorRouter.get(
    "/:id",
    isAuthenticated(["patient", "admin"]),
    doctorController.getOne
);
doctorRouter.put(
    "/:id",
    isAuthenticated(["doctor", "admin"]),
    doctorController.update
);
doctorRouter.delete(
    "/:id",
    isAuthenticated(["admin"]),
    doctorController.remove
);

module.exports = doctorRouter;s