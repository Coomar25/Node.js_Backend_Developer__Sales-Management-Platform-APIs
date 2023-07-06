const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        fullName: "seed 1",
        email: "seed11@seed.com",
        password: await bcrypt.hash("hacker", 10),
        role: "USER",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        fullName: "seed 2",
        email: "seed22@seed.com",
        password: await bcrypt.hash("hacker", 10),
        role: "ADMIN",
      },
    });

    // Create products
    const product1 = await prisma.product.create({
      data: {
        name: "Product 1",
        description: "This is the first product",
        price: 10.99,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: "Product 2",
        description: "This is the second product",
        price: 19.99,
      },
    });

    // Create orders
    const order1 = await prisma.order.create({
      data: {
        userId: user1.id,
        productId: product1.id,
        quantity: 2,
        totalAmount: product1.price * 2,
        status: "PENDING",
      },
    });

    const order2 = await prisma.order.create({
      data: {
        userId: user2.id,
        productId: product2.id,
        quantity: 1,
        totalAmount: product2.price,
        status: "PENDING",
      },
    });

    console.log("Seed data created successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
