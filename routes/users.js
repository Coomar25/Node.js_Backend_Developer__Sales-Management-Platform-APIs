import express from 'express';
import { registerUser } from '../controller/user.js';
const router = express.Router();




router.post("/api/registeruser", registerUser);




export default router;