const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

beforeAll(async () => {
  // Seeding Customers
  try {
    await sequelize.queryInterface.bulkInsert("Customers", [
      {
        email: "minatoaqua2@gmail.com",
        password: hashPassword("123456"),
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
});

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
  // 1
  describe("Success Case: ", () => {
    it("Register", async () => {
      const bodyData = {
        email: "minatoaqua@gmail.com",
        password: "123456",
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
    // 2
    it("Null Email", async () => {
      const bodyData = {
        password: "123456",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[0]",
        "Email should not be null"
      );
    });

    // 3
    it("Null Password", async () => {
      const bodyData = {
        email: "minatoaqua@gmail.com",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[0]",
        "Password should not be null"
      );
    });

    // 7
    it("Wrong email format", async () => {
      const bodyData = {
        email: "minatoaqua",
        password: "123456",
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

    // 4
    it("Empty Email", async () => {
      const bodyData = {
        email: "",
        password: "123456",
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

    // 5
    it("Empty Password", async () => {
      const bodyData = {
        email: "minatoaqua@gmail.com",
        password: "",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[0]",
        "Password should not be empty"
      );
    });

    // 6
    it("Email already exist", async () => {
      const bodyData = {
        email: "minatoaqua2@gmail.com",
        password: "123",
      };

      const response = await request(app)
        .post("/customers/register")
        .send(bodyData);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message[0]",
        "This email is already taken"
      );
    });
  });
});
