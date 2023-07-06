const request = require("supertest");
const { app } = require("../src/index"); // Replace with the path to your Express app

describe("Product APIs", () => {
  let token;
  let server;

  beforeAll(async () => {
    // Perform user login to obtain the authentication token
    const loginResponse = await request(app).post("/api/users/login").send({
      email: "user1@user.com",
      password: "hacker",
    });
    // console.log(loginResponse.body);
    token = loginResponse.body.token;
  });

  it("should add a new product", async () => {
    const response = await request(app)
      .post("/api/products/add-product")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test product",
        description: "Product test description",
        price: 9.99,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Product added successfully."
    );
    expect(response.body).toHaveProperty("product");
  }, 6000000);

  it("should get product details by ID", async () => {
    const productId = 2;
    const response = await request(app).get(
      `/api/products/get-product/${productId}`
    );
    // .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product details retrieved successfully."
    );
    expect(response.body).toHaveProperty("product");
  }, 600000);

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
