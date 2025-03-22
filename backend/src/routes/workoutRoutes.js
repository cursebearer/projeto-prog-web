import express from 'express';
import { 
  createWorkout, 
  getAllWorkouts, 
  getWorkoutById, 
  updateWorkout, 
  deleteWorkout 
} from '../controllers/WorkoutController.js';

const router = express.Router();

router.post('/', createWorkout);
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
