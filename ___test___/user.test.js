const request = require("supertest");
const app = require("../app");

describe("POST /register", () => {
  //   it("Success Register", async () => {
  //     const bodyData = {
  //       username: "bmnaufaal",
  //       email: "dummy5@gmail.com",
  //       password: "123456",
  //       phoneNumber: "123456",
  //       address: "Japan",
  //     };

  //     const response = await request(app)
  //       .post("/customer/register")
  //       .send(bodyData);
  //     expect(response.status).toBe(201);
  //     expect(response.body).toBeInstanceOf(Object);
  //     expect(response.body).toHaveProperty("id", expect.any(Number));
  //     expect(response.body).toHaveProperty("email", expect.any(String));
  //   });

  it("Null Email", async () => {
    const bodyData = {
      username: "bmnaufaal",
      password: "123456",
      phoneNumber: "123456",
      address: "Japan",
    };

    const response = await request(app)
      .post("/customer/register")
      .send(bodyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Email should not be null",
    ]);
  });

  it("Null Password", async () => {
    const bodyData = {
      username: "bmnaufaal",
      email: "dummy5@gmail.com",
      phoneNumber: "123456",
      address: "Japan",
    };

    const response = await request(app)
      .post("/customer/register")
      .send(bodyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Password should not be null",
    ]);
  });

  it("Empty Email / Wrong email format", async () => {
    const bodyData = {
      username: "bmnaufaal",
      email: "",
      password: "123456",
      phoneNumber: "123456",
      address: "Japan",
    };

    const response = await request(app)
      .post("/customer/register")
      .send(bodyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Email should be email format",
    ]);
  });

  it("Empty Password", async () => {
    const bodyData = {
      username: "bmnaufaal",
      email: "dummyacc@gmail.com",
      password: "",
      phoneNumber: "123456",
      address: "Japan",
    };

    const response = await request(app)
      .post("/customer/register")
      .send(bodyData);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Password should not be empty",
    ]);
  });
});
