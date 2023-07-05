import express from 'express';
import { registerUser, loginUser, testJWtAuthorization, getalluser, updateUser, deleteUser } from '../controller/user.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();



// register new users
router.post("/api/registeruser", registerUser);

router.post("/api/loginuser", loginUser);
// authenticate existing users
router.get("/api/testJWtAuthorization", authenticateToken, testJWtAuthorization);
// manage user profiles.
router.get("/api/getallUser", authenticateToken, getalluser);
router.put("/api/updateuser/:id", authenticateToken, updateUser);
router.delete("/api/deleteUser/:id", authenticateToken, deleteUser);







export default router;