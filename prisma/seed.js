const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

// Instantiate the Prisma Client
const prisma = new PrismaClient();

// Define the seed function
async function seed() {
  try {
    // Create Users
    const user1 = await prisma.user.create({
      data: {
        fullName: "Donib Irakihda",
        email: "admin@admin.com",
        password: await bcrypt.hash("hacker", 10),
        avatar: "img.jpg",
        role: "ADMIN",
      },
    });

    // Create products
    const product1 = await prisma.product.create({
      data: {
        name: "Apple",
        price: 20.0,
      },
    });

    // Create Orders
    const order1 = await prisma.order.create({
      data: {
        userId: user1.id,
        totalAmount: 20,
        products: {
          create: [
            { productId: product1.id, quantity: 1, price: product1.price },
          ],
        },
      },
    });

    console.log("seeded");
  } catch (error) {
    console.error("error: ", error);
  } finally {
    // Disconnect the Prisma Client
    await prisma.$disconnect();
  }
}

// Run the seed function
seed();
