const request = require("supertest");
const { app } = require("../src/index");

describe("Report APIs", () => {
  let server;

  it("should get total sales", async () => {
    const response = await request(app).get("/api/reports/get-total-sales");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Total sale of all time.");
    expect(response.body).toHaveProperty("totalSales");
  });

  it("should get top selling products", async () => {
    const limit = 5;
    const response = await request(app).get(
      "/api/reports/get-top-selling-products"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      `Top ${limit} selling products.`
    );
    expect(response.body).toHaveProperty("products");
  }, 600000);

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});
