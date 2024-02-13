const express = require("express");
const adminController = require("../controllers/admin.controller");
const isAuthenticated = require("../middlewares/authJwt");

const adminRouter = express.Router();

adminRouter.post("/", isAuthenticated(["admin"]), adminController.store);

module.exports = adminRouter;