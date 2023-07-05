import db from '../model/dbmodel.js'

export const addProduct = async (req, res) => {
    const { productname, description, category, price, quantity, brand, image } = req.body;
    if (!productname || !description || !category || !price || !quantity || !brand || !image) {
        return res.status(400).send({
            message: "Please provide all product information fields."
        });
    }
    const insertProduct = "INSERT INTO product (productname, description, category, price, quantity, brand, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
        const result = await db.promise().execute(insertProduct, [productname, description, category, price, quantity, brand, image]);
        res.status(200).json({
            message: "Product has been stored successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while inserting product data."
        });
    }
};


export const getAllProductDetail = (req, res) => {
    const getProduct = "SELECT * FROM product";
    db.query(getProduct, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "An error occured while all product details"
            })
        } else
            res.status(200).json({
                result
            });
    });
}



export const updateProduct = async (req, res) => {
    const { productname, description, category, price, quantity, brand, image } = req.body;
    const productId = req.params.id;

    if (!productId || !productname || !description || !category || !price || !quantity || !brand || !image) {
        return res.status(400).send({
            message: "Please provide all product information fields."
        });
    }

    const updateProductQuery = "UPDATE product SET productname=?, description=?, category=?, price=?, quantity=?, brand=?, image=? WHERE id=?";
    try {
        const result = await db.promise().execute(updateProductQuery, [productname, description, category, price, quantity, brand, image, productId]);

        if (result[0].affectedRows === 0) {
            return res.status(404).send({
                message: "Product not found."
            });
        }

        res.status(200).json({
            message: "Product has been updated successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while updating product data."
        });
    }
};


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).send({
            message: "Please provide a product ID."
        });
    }

    const deleteProductQuery = "DELETE FROM product WHERE id=?";
    try {
        const result = await db.promise().execute(deleteProductQuery, [productId]);

        if (result[0].affectedRows === 0) {
            return res.status(404).send({
                message: "Product not found."
            });
        }

        res.status(200).json({
            message: "Product has been deleted successfully."
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while deleting product data."
        });
    }
};





