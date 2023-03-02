const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

afterAll(async () => {
  // Remove Seeding Customer
  try {
    await sequelize.queryInterface.bulkDelete("Customers", null, {
      where: {
        email: "minatoaqua@gmail.com",
      },
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("POST /customers/register", () => {
  describe("Success Case: ", () => {
    it("Register", async () => {
      const bodyData = {
        // fullName: "Minato Aqua",
        email: "minatoaqua@gmail.com",
        password: "123456",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("email", expect.any(String));
    });
  });

  describe("Failed Case: ", () => {
    it("Null Email", async () => {
      const bodyData = {
        fullName: "Minato Aqua",
        password: "123456",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message[0]", [
        "Email is required",
      ]);
    });

    it("Null Password", async () => {
      const bodyData = {
        fullName: "Minato Aqua",
        email: "minatoaqua@gmail.com",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message[0]", [
        "Password is required",
      ]);
    });

    it("Wrong email format", async () => {
      const bodyData = {
        fullName: "Minato Aqua",
        email: "minatoaqua",
        password: "123456",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[0]",
        "Email should be email format"
      );
    });

    it("Empty Email", async () => {
      const bodyData = {
        fullName: "Minato Aqua",
        email: "",
        password: "123456",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[1]",
        "Email should not be empty"
      );
    });

    it("Empty Password", async () => {
      const bodyData = {
        fullName: "Minato Aqua",
        email: "dummyacc@gmail.com",
        password: "",
        phoneNumber: "123456",
        address: "Japan",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      console.log("body message");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message[0]", [
        "Password is required",
      ]);
    });
  });
});
