const request = require("supertest");
const { app } = require("../src/index"); // Replace with the path to your Express app

describe("Order APIs", () => {
  let token;
  let server;

  beforeAll(async () => {
    // Perform user login to obtain the authentication token
    const loginResponse = await request(app).post("/api/users/login").send({
      email: "user1@user.com",
      password: "hacker",
    });

    token = loginResponse.body.token;
  });

  it("should add a new order", async () => {
    const response = await request(app)
      .post("/api/orders/add-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 1,
        productId: 1,
        quantity: 1,
        totalAmount: 9.99,
        status: "PENDING",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Order added successfully."
    );
    expect(response.body).toHaveProperty("order");
  }, 6000000);

  it("should get order details by ID", async () => {
    const orderId = 1;
    const response = await request(app).get(
      `/api/orders/get-order-by-id/${orderId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Order details retrieved successfully."
    );
    expect(response.body).toHaveProperty("order");
  }, 600000);

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
