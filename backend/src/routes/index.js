import express from 'express';
import userRoutes from './userRoutes.js';
import dailyLogRoutes from './dailyLogRoutes.js';
import workoutRoutes from './workoutRoutes.js';
import workoutSetRoutes from './workoutSetRoutes.js';
import mealRoutes from './mealRoutes.js';
import mealItemRoutes from './mealItemRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: "Servidor rodando" });
});

router.use('/users', userRoutes);
router.use('/dailylogs', dailyLogRoutes);
router.use('/workouts', workoutRoutes);
router.use('/workoutsets', workoutSetRoutes);
router.use('/meals', mealRoutes);
router.use('/mealitems', mealItemRoutes);

export default router;
