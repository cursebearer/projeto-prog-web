import express from 'express';
import { 
  createWorkoutSet, 
  getAllWorkoutSets, 
  getWorkoutSetById, 
  updateWorkoutSet, 
  deleteWorkoutSet,
  getWorkoutSetsByWorkoutId 
} from '../controllers/WorkouSetController.js';

const router = express.Router();

router.post('/', createWorkoutSet);
router.get('/', getAllWorkoutSets);
router.get('/:id', getWorkoutSetById);
router.get('/workout/:workoutId', getWorkoutSetsByWorkoutId);
router.put('/:id', updateWorkoutSet);
router.delete('/:id', deleteWorkoutSet);

export default router;
