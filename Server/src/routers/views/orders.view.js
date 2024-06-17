import CustomRouter from "../CustomRouter.js";
import winstonLog from "../../utils/logger/index.js"
import orders from "../../data/mongo/orders.mongo.js" //!!!!!se debe importar desde DAO o Factory en caso de que este como factory
import users from "../../data/mongo/users.mongo.js"   //!!!!!!se debe importar desde DAO o Factory en caso de que este como factory


class OrdersRouter extends CustomRouter {


  init() {

this.read("/newO",["PREM", "USER", "ADMIN"], /*isAdmin,*/ (req, res, next) => {//passcalback("jwt")
  try {
    return res.render("newO", { title: "CREATE ORDER" });
  } catch (error) {
    next(error);
  }
});
/*this.read("/formOrders", ["USER"], isAdmin, (req, res, next) => { //passcalback("jwt")
  try {
    return res.render("formOrders", { title: "CREATE MOVIE" });
  } catch (error) {
    next(error);
  }
});*/

this.read("/", ["USER"], async (req, res, next) => { //passcalback("jwt")
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    console.log(req.user.email);
    const user = await users.readByEmail(req.user.email);
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });
    winstonLog.INFO(all.docs); //docs.[0]
    return res.render("orders", { title: "MY CART", orders: all.docs });
  } catch (error) {
    console.log(error);
    return res.render("orders", {
      title: "MY CART",
      message: "NO ORDERS YET!",
    });
  }
});
}
}

const ordersRouter = new OrdersRouter();

export default ordersRouter.getRouter();