
import service from "../services/orders.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";


class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.readOne(oid);
      if (response) {
         return res.success200(response);
      }
     CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.invalidId)
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      if (response) {
         return res.success200(response);
      }
     CustomError.new(errors.invalidId)
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, update, destroy } = controller;
export { create, read, update, destroy };