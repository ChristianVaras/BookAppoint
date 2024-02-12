import { authRouter } from "../components/index.js";

const routes = [["auth", authRouter]];

export const router = (app) => {
    routes.forEach(([path, controller]) => {
        app.use(`/api/v1/${path}`, controller);
    });
};