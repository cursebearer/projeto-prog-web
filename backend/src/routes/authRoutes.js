import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getUserProfileById } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile/:id', authMiddleware, getUserProfileById);
export default router;
