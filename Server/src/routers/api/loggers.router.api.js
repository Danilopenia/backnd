import { Router } from 'express';
import logger from '../../utils/logger/index.js'; // Ajusta la ruta según sea necesario
import winston from "../../utils/logger/winston.utils.js";

class LoggersRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', (req, res) => {
            winston.INFO("MENSAJE DE info");
            winston.ERROR("MENSAJE DE error");
            winston.WARN("MENSAJE DE fatal");

            res.send("TEST LOGGER");
        });
    }

    getRouter() {
        return this.router;
    }
}

const loggersRouter = new LoggersRouter().getRouter();
export default loggersRouter;
