const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let access_token;
function expectMoviesData(response) {
  expect(response.body).toBeInstanceOf(Array);
  expect(response.body[0]).toHaveProperty("id", expect.any(Number));
  expect(response.body[0]).toHaveProperty("title", expect.any(String));
  expect(response.body[0]).toHaveProperty("synopsis", expect.any(String));
  expect(response.body[0]).toHaveProperty("trailerUrl", expect.any(String));
  expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
  expect(response.body[0]).toHaveProperty("rating", expect.any(Number));
  expect(response.body[0]).toHaveProperty("genreId", expect.any(Number));
  expect(response.body[0]).toHaveProperty("authorId", expect.any(Number));
  expect(response.body[0]).toHaveProperty("status", expect.any(String));
  expect(response.body[0].Genre).toHaveProperty("id", expect.any(Number));
  expect(response.body[0].Genre).toHaveProperty("name", expect.any(String));
  expect(response.body[0].Author).toHaveProperty("id", expect.any(Number));
  expect(response.body[0].Author).toHaveProperty(
    "username",
    expect.any(String)
  );
  expect(response.body[0].Author).toHaveProperty("email", expect.any(String));
  expect(response.body[0].Author).toHaveProperty("role", expect.any(String));
}

function expectMovieDetail(response) {
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body).toHaveProperty("id", expect.any(Number));
  expect(response.body).toHaveProperty("title", expect.any(String));
  expect(response.body).toHaveProperty("synopsis", expect.any(String));
  expect(response.body).toHaveProperty("trailerUrl", expect.any(String));
  expect(response.body).toHaveProperty("imgUrl", expect.any(String));
  expect(response.body).toHaveProperty("rating", expect.any(Number));
  expect(response.body).toHaveProperty("genreId", expect.any(Number));
  expect(response.body).toHaveProperty("authorId", expect.any(Number));
  expect(response.body).toHaveProperty("status", expect.any(String));
  expect(response.body.Genre).toHaveProperty("id", expect.any(Number));
  expect(response.body.Genre).toHaveProperty("name", expect.any(String));
  expect(response.body.Author).toHaveProperty("id", expect.any(Number));
  expect(response.body.Author).toHaveProperty("username", expect.any(String));
  expect(response.body.Author).toHaveProperty("email", expect.any(String));
  expect(response.body.Author).toHaveProperty("role", expect.any(String));
}

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

  // Test access token
  const payload = {
    id: 1,
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
});

describe("GET /customers/movies", () => {
  describe("Success Case: ", () => {
    it("Get movies with no parameters", async () => {

      const response = await request(app).get("/customers/movies")
      expect(response.status).toBe(200);
      expectMoviesData(response);
    });
  });

  it("Success get movies with filter parameters", async () => {
    const query = {
      "filter[genre]": 3,
    };
    const response = await request(app)
      .get("/customers/movies")
      .query(query)
    expect(response.status).toBe(200);
    expectMoviesData(response);
  });

  it("Get movies with pagination parameters", async () => {
    const query = {
      "page[size]": 10,
      "page[number]": 1,
    };

    const response = await request(app)
      .get("/customers/movies")
      .query(query)
    expect(response.status).toBe(200);
    expectMoviesData(response);
  });

  it("Get movie detail with params id", async () => {
    const params = 1;
    const response = await request(app)
      .get("/customers/movies/" + params)
    expect(response.status).toBe(200);
    expectMovieDetail(response);
  });

  describe("Failed Case: ", () => {
    it("Get movie detail with invalid params id", async () => {
      const params = 999;
      const response = await request(app)
        .get("/customers/movies/" + params)
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Movie not found");
    });
  });
});
