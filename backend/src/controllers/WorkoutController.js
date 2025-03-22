import Workout from "../models/workout.js";


export const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(200).json({ workout });
  } catch (err) {
    res.status(400).json(err);
  }
};


export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.status(200).json({ workouts });
  } catch (err) {
    res.status(400).json(err);
  }
};


export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    res.status(200).json({ workout });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ workout });
  } catch (err) {
    res.status(400).json(err);
  }
};


export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
