const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

beforeAll(async () => {
  // Seeding Customers
  try {
    await sequelize.queryInterface.bulkInsert("Customers", [
      {
        fullName: "Minato Aqua",
        email: "minatoaqua@gmail.com",
        password: hashPassword("123456"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  // Remove Seeding Customers
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

describe("POST /customers/login", () => {
  describe("Success Case: ", () => {
    it("Login", async () => {
      const bodyData = {
        email: "minatoaqua@gmail.com",
        password: "123456",
      };

      const response = await request(app)
        .post("/customers/login")
        .send(bodyData);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed Case: ", () => {
    it("Wrong password", async () => {
      const bodyData = {
        email: "minatoaqua@gmail.com",
        password: "1234567",
      };

      const response = await request(app)
        .post("/customers/login")
        .send(bodyData);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });

    it("Wrong email", async () => {
      const bodyData = {
        email: "null@gmail.com",
        password: "123456",
      };

      const response = await request(app)
        .post("/customers/login")
        .send(bodyData);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });
  });
});
