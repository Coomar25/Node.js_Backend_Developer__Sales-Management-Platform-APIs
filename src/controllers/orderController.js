const { PrismaClient } = require("@prisma/client");
const { paginateResults } = require("../helper/paginationHelper");

const prisma = new PrismaClient();

// Add an order
const addOrder = async (req, res) => {
  const { userId, productId, quantity, status } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { orders: true },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { orders: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
        quantity: Number(quantity),
        totalAmount: product.price * quantity,
        status,
      },
    });

    // Update user's orders array
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { orders: { connect: { id: order.id } } },
    });

    // Update product's orders array
    const updatedProduct = await prisma.product.update({
      where: { id: Number(productId) },
      data: { orders: { connect: { id: order.id } } },
    });
    res
      .status(201)
      .json({ message: "Order added successfully.", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while ordering." });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const orderId = Number(req.params.id);
  const { userId, productId, quantity } = req.body;

  try {
    // Check for order exists or not
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Check for user or products exist or not
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { orders: true },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { orders: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        userId: userId ? Number(userId) : order.userId,
        productId: productId ? Number(productId) : order.productId,
        quantity: quantity ? Number(quantity) : order.quantity,
        totalAmount: product.price * quantity,
      },
    });
    res
      .status(200)
      .json({ message: "Order updated successfully.", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating order." });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const orderId = Number(req.params.id);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, product: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    await prisma.order.delete({
      where: { id: orderId },
    });

    // // Remove order from user's orders array
    // await prisma.user.update({
    //   where: { id: order.userId },
    //   data: { orders: { disconnect: { id: orderId } } },
    // });

    // // Remove order from product's orders array
    // await prisma.product.update({
    //   where: { id: order.productId },
    //   data: { orders: { disconnect: { id: orderId } } },
    // });

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting order." });
  }
};

// Get a product by id
const getOrderById = async (req, res) => {
  const orderId = Number(req.params.id);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, product: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res
      .status(200)
      .json({ message: "Order details retrieved successfully.", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting a order." });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await prisma.order.findMany({ include: { product: true } });
    if (!orders) {
      return res.status(404).json({ error: "No orders found" });
    }

    const paginatedOrders = paginateResults(orders, page, limit);
    res.status(200).json({
      message: "All order fetched successfully.",
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
      all_orders: paginatedOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all orders." });
  }
};

// Get all orders by a user
const getAllOrdersByUser = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / limit);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const paginatedOrders = paginateResults(user.orders, page, limit);

    res.status(200).json({
      message: "Orders fetched successfully.",
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
      all_orders: paginatedOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while retrieving user orders." });
  }
};

// Get all orders by product
const getAllOrdersByProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / limit);

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { orders: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const paginatedOrders = paginateResults(product.orders, page, limit);

    res.status(200).json({
      message: "All orders retrieved successfully.",
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
      all_orders: paginatedOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while retrieving product orders." });
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getAllOrders,
  getAllOrdersByUser,
  getAllOrdersByProduct,
};
