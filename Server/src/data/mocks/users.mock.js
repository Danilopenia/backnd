import { faker } from "@faker-js/faker";
import repository from "../../repositories/users.rep.js"
import dbUtils from "../../utils/db.utils.js";
import createProduct from "./products.mock.js";
import winston from "../utils/logger/winston.utils.js";

function usersMock() {
  return {
    name: faker.person.firstName(),
    email:
      (faker.person.firstName() +
      faker.person.lastName()).toLowerCase() +
      faker.number.hex(64) +
      "@coder.com",
    password: "hola1234",
  };
}

async function createMocks(){
  try {
     const data = usersMock();
     dbUtils()
     const user = await repository.create(data)
     for(let i=1; i<=10;i++)
     await createProduct(user._id)
    winston.INFO("USER CREATED");
  } catch (error) {
    winston.ERROR(error.message);
  }
}
createMocks();