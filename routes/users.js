import express from 'express';
import { registerUser, loginUser, testJWtAuthorization, getalluser, updateUser, deleteUser } from '../controller/user.js';
import { addProduct, getAllProductDetail, updateProduct, deleteProduct } from '../controller/productController.js';
import { createOrder, updateOrder, deleteOrder, allOrderDetails } from '../controller/orderController.js'
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

// APIs to register new users, authenticate existing users based on JWT Authentication and Authorization using Middleware, and manage user profiles.
router.post("/api/registeruser", registerUser);
router.post("/api/loginuser", loginUser);
router.get("/api/testJWtAuthorization", authenticateToken, testJWtAuthorization);
router.get("/api/getallUser", authenticateToken, getalluser);
router.put("/api/updateuser/:id", authenticateToken, updateUser);
router.delete("/api/deleteUser/:id", authenticateToken, deleteUser);

//  APIs to create, update, delete, and retrieve product information.
router.post('/api/addProduct', authenticateToken, addProduct);
router.get('/api/getAllProductDetail', getAllProductDetail);
router.put('/api/updateProduct/:id', updateProduct);
router.delete('/api/deleteProduct/:id', deleteProduct);



// APIs to create, update, delete, and retrieve order information.
router.post('/api/createOrder/:id', createOrder);
router.put('/api/updateOrder/:orderId', updateOrder);
router.delete('/api/deleteOrder/:orderId', deleteOrder);
router.get('/api/allOrderDetails', allOrderDetails);







export default router;