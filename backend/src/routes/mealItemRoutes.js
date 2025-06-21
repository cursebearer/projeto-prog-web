import express from 'express';
import { 
  createMealItem, 
  getAllMealItems, 
  getMealItemById, 
  updateMealItem, 
  deleteMealItem, 
  getMealItemsByMealId
} from '../controllers/MealItemController.js';

const router = express.Router();

router.post('/', createMealItem);
router.get('/', getAllMealItems);
router.get('/:id', getMealItemById);
router.get('/meal/:mealId', getMealItemsByMealId);
router.put('/:id', updateMealItem);
router.delete('/:id', deleteMealItem);

export default router;
