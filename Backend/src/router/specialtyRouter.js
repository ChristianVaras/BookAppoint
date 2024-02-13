const express = require("express");
const specialtyController = require("../controllers/specialty.controller");
const isAuthenticated = require("../middlewares/authJwt");

const specialtyRouter = express.Router();

specialtyRouter.post(
    "/",
    isAuthenticated(["admin"]),
    specialtyController.store
);
specialtyRouter.get(
    "/",
    isAuthenticated(["patient", "doctor", "admin"]),
    specialtyController.getAll
);
specialtyRouter.get(
    "/:id",
    isAuthenticated(["patient", "admin"]),
    specialtyController.getOne
);
specialtyRouter.put(
    "/:id",
    isAuthenticated(["admin"]),
    specialtyController.update
);
specialtyRouter.delete(
    "/:id",
    isAuthenticated(["admin"]),
    specialtyController.remove
);

module.exports = specialtyRouter;