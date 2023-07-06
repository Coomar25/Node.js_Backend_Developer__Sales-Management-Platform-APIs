const request = require("supertest");
const { app } = require("../src/index");

describe("User APIs", () => {
  let token;
  let server;

  it("should register a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      fullName: "test user1",
      email: "test1@test.com",
      password: "hacaker",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully."
    );
    expect(response.body).toHaveProperty("user");
  });

  it.only("should log in a user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test1@test.com",
      password: "hacaker",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User logged in successfully."
    );
    expect(response.body).toHaveProperty("token");
    token = response.body.token; // Save the token for subsequent tests
  });

  it.only("should get user details by ID", async () => {
    const userId = 2;
    const response = await request(app).get(`/api/users/get-user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User details retrieved successfully."
    );
    expect(response.body).toHaveProperty("user");
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
