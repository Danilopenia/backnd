import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
import winstonLog from "../utils/logger/index.js";
const { user } = dao;
const { product } = dao

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("testing my API", () => {

  describe("Testeando Users", () => {
    const user = {
      name: "coder",
      email: "coder@coder.com",
      password: "hola1234",
      role: "1",
    };
    let uid;
    let token = {};

    it("Registro de un usuario correctamente", async () => {
      const response = await requester.post("/sessions/register").send(user);
      const { _body, statusCode } = response;
      uid = _body.payload._id;
      expect(statusCode).to.be.equals(201);
    });

    it("Inicio de sesión correctamente", async () => {
      const response = await requester.post("/sessions/login").send(user);
      const { statusCode, headers } = response;
      winstonLog.INFO(headers);
      token.key = headers["set-cookie"][0].split("=")[0];
      token.value = headers["set-cookie"][0].split("=")[1];
      expect(statusCode).to.be.equals(200);
    });

    it("Cerrado de sesión correctamente", async () => {
      const response = await requester.post("/sessions/signout").set("Cookie", [
        token.key + "=" + token.value,
      ]);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Eliminación de un usuario correctamente", async () => {
      winstonLog.INFO(uid);
      const response = await requester.delete("/users/" + uid);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
  });

  describe("Testeando Products", () => {
    const product = {
      title: "chomba",
      price: 1000000,
      stock: 999999999,
    };
    let pid;

    it("Registro de un producto correctamente", async () => {
      const response = await requester.post("/products/create").send(product);
      const { _body, statusCode } = response;
      
      pid = _body.payload._id;
      expect(statusCode).to.be.equals(201);
      expect(_body.payload.title).to.be.equals(product.title);
      expect(_body.payload.price).to.be.equals(product.price);
      expect(_body.payload.stock).to.be.equals(product.stock);
    });

    it("Obtención de productos correctamente", async () => {
      const response = await requester.get("/products");
      const { statusCode, _body } = response;
      
      expect(statusCode).to.be.equals(200);
      expect(_body.payload).to.be.an("array");
      const createdProduct = _body.payload.find(p => p._id === pid);
      expect(createdProduct).to.not.be.undefined;
    });

    it("Actualización de un producto correctamente", async () => {
      const updatedProduct = {
        title: "chomba actualizada",
        price: 2000000,
        stock: 888888888,
      };
      const response = await requester.put("/products/" + pid).send(updatedProduct);
      const { statusCode, _body } = response;
     
      expect(statusCode).to.be.equals(200);
      expect(_body.payload.title).to.be.equals(updatedProduct.title);
      expect(_body.payload.price).to.be.equals(updatedProduct.price);
      expect(_body.payload.stock).to.be.equals(updatedProduct.stock);
    });

    it("Eliminación de un producto correctamente", async () => {
      winstonLog.INFO(pid);
      const response = await requester.delete("/products/" + pid);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });
  });
});
