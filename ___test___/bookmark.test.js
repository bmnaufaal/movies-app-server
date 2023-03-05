const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
  // Seeding user
  const users = require("../data/users.json").map((element) => {
    element.password = hashPassword(element.password);
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  try {
    await sequelize.queryInterface.bulkInsert("Users", users, {});
  } catch (error) {
    console.log(error);
  }

  // Seeding genres
  const genres = require("../data/genres.json").map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  try {
    await sequelize.queryInterface.bulkInsert("Genres", genres, {});
  } catch (error) {
    console.log(error);
  }

  // Seeding movies
  const movies = require("../data/movies.json").map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });

  try {
    await sequelize.queryInterface.bulkInsert("Movies", movies, {});
  } catch (error) {
    console.log(error);
  }

  // Seeding customers
  const customers = require("../data/customers.json").map((element) => {
    element.password = hashPassword(element.password);
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  try {
    await sequelize.queryInterface.bulkInsert("Customers", customers, {});
  } catch (error) {
    console.log(error);
  }

  // Seeding bookmarks
  const bookmarks = require("../data/bookmarks.json").map((element) => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    return element;
  });
  try {
    await sequelize.queryInterface.bulkInsert("Bookmarks", bookmarks, {});
  } catch (error) {
    console.log(error);
  }

  // Test access token
  const payload = {
    id: 3,
  };
  access_token = createToken(payload);
});

afterAll(async () => {
  // Remove Seeding Users
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  // Remove Seeding Genres
  await sequelize.queryInterface.bulkDelete("Genres", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  // Remove Seeding Movies
  await sequelize.queryInterface.bulkDelete("Movies", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  // Remove Seeding Customers
  await sequelize.queryInterface.bulkDelete("Customers", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  // Remove Seeding Bookmarks
  await sequelize.queryInterface.bulkDelete("Bookmarks", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("GET /customers/bookmarks", () => {
  describe("Success case: ", () => {
    it("Get Bookmarks", async () => {
      const headers = {
        access_token: access_token,
      };

      const response = await request(app)
        .get("/customers/bookmarks")
        .set(headers);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("id", expect.any(Number));
      expect(response.body[0]).toHaveProperty("CustomerId", expect.any(Number));
      expect(response.body[0]).toHaveProperty("MovieId", expect.any(Number));
    });
  });

  describe("Failed case: ", () => {
    it("Get Bookmarks with no access_token", async () => {
      const response = await request(app).get("/customers/bookmarks");
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });

    it("Get Bookmarks with wrong access_token", async () => {
      const headers = {
        access_token: "WRONG_TOKEN",
      };
      const response = await request(app)
        .get("/customers/bookmarks")
        .set(headers);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
});

describe("POST /customers/bookmarks/add", () => {
  describe("Success case: ", () => {
    it("Success Post Bookmarks", async () => {
      const headers = {
        access_token: access_token,
      };

      const bodyData = {
        MovieId: 1,
      };

      const response = await request(app)
        .post("/customers/bookmarks/add")
        .set(headers)
        .send(bodyData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("CustomerId", expect.any(Number));
      expect(response.body).toHaveProperty("MovieId", expect.any(Number));
    });
  });

  describe("Failed case: ", () => {
    it("Post Bookmarks with wrong id", async () => {
        const headers = {
          access_token: access_token,
        };
  
        const bodyData = {
          CustomerId: 999,
          MovieId: 999,
        };
  
        const response = await request(app)
          .post("/customers/bookmarks/add")
          .set(headers)
          .send(bodyData);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Customer not found");
      });
  });
});
