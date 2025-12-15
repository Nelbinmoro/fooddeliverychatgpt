import express from 'express';
import { registerUser, authUser } from '../controllers/authController.js';
import { protect } from "../middlewares/authMiddleware.js";
import { updateProfile } from "../controllers/authController.js";




const router = express.Router();
router.post('/register', registerUser);
router.post('/login', authUser);
router.put("/profile", protect, updateProfile);
export default router;