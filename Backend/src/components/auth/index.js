import { Router } from "express";
import * as Controller from "./controller.js";

const authRouter = Router();
authRouter.get("/login", Controller.login);

export default authRouter;