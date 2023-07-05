import express from 'express';
import { registerUser, loginUser, testJWtAuthorization } from '../controller/user.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();




router.post("/api/registeruser", registerUser);
router.post("/api/loginuser", loginUser);
router.get("/api/testJWtAuthorization", authenticateToken, testJWtAuthorization);







export default router;