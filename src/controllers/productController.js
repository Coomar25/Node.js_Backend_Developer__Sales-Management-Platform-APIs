const { PrismaClient } = require("@prisma/client");
const { paginateResults } = require("../helper/paginationHelper");

const prisma = new PrismaClient();

// Add a product
const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image: req.file?.path,
      },
    });

    res
      .status(201)
      .json({ message: "Product added successfully.", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while adding a product." });
  }
};

// Update a product by id
const updateProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const { name, description, price } = req.body;

  try {
    // Find a product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(401).json({ error: "Product not found." });
    }

    // Payload of product to update
    const updateData = {
      name: name,
      price: Number(price),
      description: description,
    };

    // If image is to be updated
    if (req.file) {
      updateData.image = req.file?.path;
    }

    // Update the data in database
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating a product." });
  }
};

// Delete a product by id
const deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);

  try {
    // Find a product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(401).json({ error: "Product not found." });
    }

    // Delete from database
    await prisma.product.delete({ where: { id: productId } });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting a product." });
  }
};

// Get a product by id
const getProductById = async (req, res) => {
  const productId = Number(req.params.id);
  try {
    // Find a product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(401).json({ error: "Product not found." });
    }

    // Show product details
    res
      .status(200)
      .json({ message: "Product retrieved successfully.", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting a product." });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);
    // Find a product
    const products = await prisma.product.findMany({});
    if (!products) {
      return res.status(401).json({ error: "No Products found." });
    }

    const paginatedProducts = paginateResults(products, page, limit);

    // Show product details
    res.status(200).json({
      message: "Products retrieved successfully.",
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      all_products: paginatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting all product." });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
