import express from 'express';
import { 
  createMeal, 
  getAllMeals, 
  getMealById, 
  updateMeal, 
  deleteMeal 
} from '../controllers/MealController.js';

const router = express.Router();

router.post('/', createMeal);
router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

export default router;
