const request = require("supertest");
const app = require("../app");

describe("User test", () => {
  it("Register test", async () => {
    const bodyData = {
      username: "bmnaufaal",
      email: "naufal@gmail.com",
      password: "123456",
    };
    const response = await request(app).post("/register").send(bodyData);
    console.log(response);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("username", expect(any.String));
    expect(response.body).toHaveProperty("email", expect(any.String));
    expect(response.body).toHaveProperty("password", expect(any.String));
  });
});
