import db from '../model/dbmodel.js';

export const createOrder = async (req, res) => {
    const { productname, price, quantity } = req.body;
    const userId = req.params.id;
    if (!userId || !productname || !price || !quantity) {
        return res.status(400).send({
            message: "Please provide all order information fields."
        });
    }
    const totalAmount = price * quantity;
    const selectUserInfo = "SELECT username FROM userinfo WHERE id=?";
    try {
        const [rows] = await db.promise().execute(selectUserInfo, [userId]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "USER NOT FOUND!"
            });
        }
        const username = rows[0].username;
        const insertOrder = "INSERT INTO orders (userId, username, productname, quantity, price, totalAmount) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.promise().execute(insertOrder, [userId, username, productname, quantity, price, totalAmount]);
        res.status(200).json({
            message: "Order has been created successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while creating the order."
        });
    }
};


export const updateOrder = async (req, res) => {
    const { quantity } = req.body;
    const id = req.params.orderId;
    if (!quantity) {
        return res.status(400).send({
            message: "Please provide the updated quantity."
        })
    }
    const selectOrderQuery = "SELECT price FROM orders WHERE id=?";
    const updateOrderQuery = "UPDATE orders SET quantity=?, totalAmount=? WHERE id=?";
    try {
        const [rows] = await db.promise().execute(selectOrderQuery, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "order not found"
            })
        }
        const price = rows[0].price;
        const totalAmount = price * quantity;
        const result = await db.promise().execute(updateOrderQuery, [quantity, totalAmount, id]);
        res.status(200).json({
            message: "Order has been updated successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while updating the order."
        });
    }
}


export const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const deleteOrderQuery = "DELETE FROM orders WHERE id=?";
    try {
        const result = await db.promise().execute(deleteOrderQuery, [orderId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order has been deleted successfully"
        });
    } catch (error) {
        res.status(500).send({
            message: "An error occurred while deleting the order"
        });
    }
};


export const allOrderDetails = (req, res) => {
    const sqlGet = "SELECT * FROM orders";
    db.query(sqlGet, (error, result) => {
        if (error)
            res.status(500).json({ error: "An error occurred while retrieving order details." });
        else
            res.json(result);
    });
}
