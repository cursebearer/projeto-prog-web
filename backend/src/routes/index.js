import express from 'express';
import authRoutes from './authRotes.js';
import dailyLogRoutes from './dailyLogRoutes.js';
import workoutRoutes from './workoutRoutes.js';
import workoutSetRoutes from './workoutSetRoutes.js';
import mealRoutes from './mealRoutes.js';
import mealItemRoutes from './mealItemRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => res.json({ message: "Servidor rodando" }));

router.use('/auth', authRoutes); 

router.use('/dailylogs', authMiddleware, dailyLogRoutes);
router.use('/workouts', authMiddleware, workoutRoutes);
router.use('/workoutsets', authMiddleware, workoutSetRoutes);
router.use('/meals', authMiddleware, mealRoutes);
router.use('/mealitems', authMiddleware, mealItemRoutes);

export default router;
