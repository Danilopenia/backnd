import ProductsServices from "../services/products.service.js"
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import winston from "../utils/logger/winston.utils.js";

class ProductsController {
  constructor() {
    this.service = ProductsServices;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      winston.INFO(JSON.stringify(data))
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: 9, //req.query.limit || 
        page: req.query.page || 1,
        sort: { category: 1}, //title: 1 
        lean: true,
      };
      const filter = {};
      if (req.query.category) {
        filter.category = new RegExp(req.query.category.trim(), "i"); //los category por title
      }
      if (req.query.sort === "desc") {
        options.sort.category = "desc";
      }
      const response = await this.service.read({ filter, options });
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.readOne(pid);
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
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data);
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
      const { pid } = req.params;
      const response = await this.service.destroy(pid);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.invalidId)
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };