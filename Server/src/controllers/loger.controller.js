import winston from "../utils/logger/winston.utils.js";

class Router extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], (req, res, next) => {
            winston.INFO("MENSAJE DE info")
            winston.ERROR("MENSAJE DE error")
            winston.WARN("MENSAJE DE fatal")

            res.send("TEST LOGGER")
        });
    }
}

const loggersRouter = new Router().getRouter();
export default loggersRouter;