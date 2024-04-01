import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.api.js";
import ViewsRouter from "./views/index.view.js";

const api = new ApiRouter();
const apiRouter = api.getRouter(); //enrutador
const views = new ViewsRouter();
const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    //this.use("/api", api.getRouter());
   // this.use("/", views.getRouter());
   this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}

