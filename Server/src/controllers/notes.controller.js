import service from "../services/notes.service.js";
import CustomError from "../utils/errors/CustomError.js";
import winston from "../utils/logger/winston.utils.js"
import errors from "../utils/errors/errors.js";

class NotesController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;

     winston.INFO(data);

      await this.service.create(data);
      return res.json({
        statusCode: 201,
        message: "Created!",
      });
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 5,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.text) {
        filter.text = new RegExp(req.query.text.trim(), "i");
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
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


  readByUser = async (req, res, next) => {
    try {
      const filter = {
        user_id: req.user._id,
      };
      const options = {
        limit: req.query.limit || 4,
        page: req.query.page || 1,
      };
      const response = await this.service.read({ filter, options });
      if (response.docs.length > 0) {
        return res.json({
          statusCode: 200,
          response: all,
        });
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  };
}



const controller = new NotesController();
const { create, readByUser } = controller;
export { create, readByUser };