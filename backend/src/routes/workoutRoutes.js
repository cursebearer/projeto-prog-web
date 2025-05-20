import express from 'express';
import { 
  createWorkout, 
  getAllWorkouts, 
  getWorkoutById, 
  updateWorkout, 
  deleteWorkout,
  getWorkoutsByUserId
} from '../controllers/WorkoutController.js';

const router = express.Router();

router.post('/', createWorkout);
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.get("/user/:id", getWorkoutsByUserId); 
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
