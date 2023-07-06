const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get total sales of all time
const getTotalSales = async (req, res) => {
  try {
    const totalSales = await prisma.order.aggregate({
      _sum: { totalAmount: true },
    });

    res.status(200).json({
      message: "Total sale of all time.",
      totalSales: totalSales._sum.totalAmount || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while retrieving total sales." });
  }
};

// Get total sales by day
const getTotalSalesByDay = async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    res.status(200).json({
      message: `Total sales by day from ${startDate} to ${endDate}`,
      totalSales: totalSales._sum.totalAmount || 0,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error while retrieving total sales by day." });
  }
};

// Get total sales by week
const getTotalSalesByWeek = async (req, res) => {
  try {
    const { date } = req.query;

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const totalSales = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    res.status(200).json({
      message: `Total sales by week from ${startDate} to ${endDate}`,
      totalSales: totalSales._sum.totalAmount || 0,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error while retrieving total sales by week." });
  }
};

// Get total sales by month
const getTotalSalesByMonth = async (req, res) => {
  try {
    const { date } = req.query;

    // Set the start date to the first day of the specified month
    const startDate = new Date(date);
    startDate.setDate(1);

    // Set the end date to the last day of the specified month
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const totalSales = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const month = startDate.toLocaleString("default", { month: "long" });

    res.status(200).json({
      message: "Total sales by month " + month,
      totalSales: totalSales._sum.totalAmount,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error while retrieving total sales by month." });
  }
};

// Top selling products
const getTopSellingProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 5;

    const topSellingProducts = await prisma.product.findMany({
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        orders: true,
      },
      take: Number(limit),
    });

    const formattedProducts = topSellingProducts.map((product) => ({
      name: product.name,
      quantity: product.orders.reduce(
        (total, order) => total + order.quantity,
        0
      ),
    }));

    res.status(200).json({
      message: `Top ${limit} selling products.`,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error while retrieving top selling products." });
  }
};

module.exports = {
  getTotalSales,
  getTotalSalesByDay,
  getTotalSalesByWeek,
  getTotalSalesByMonth,
  getTopSellingProducts,
};
