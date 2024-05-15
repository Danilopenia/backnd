import { faker } from '@faker-js/faker';
import repository from "../../repositories/products.rep.js";
//import dbUtils from "../../utils/db.utils.js";
//import winstonLog from "../utils/logger/index.js";
import "dotenv/config.js"
import dbUtils from '../../utils/db.utils.js';

function productsMock(id) {
  return {
    title: faker.commerce.product(),
    price: 30,
    stock: 200
  };
}
export default async function createProduct(id){
  try {
     const data = productsMock(id);
     dbUtils();
  await repository.create(data)
  console.log("PRODUCT CREATED");
  } catch (error) {
    console.log(error);
  }
}