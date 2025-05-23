import WorkoutSet from "../models/workoutSet.js";

export const createWorkoutSet = async (req, res) => {
  try {
    const workoutSet = await WorkoutSet.create(req.body);
    res.status(200).json({ workoutSet });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllWorkoutSets = async (req, res) => {
  try {
    const workoutSets = await WorkoutSet.findAll();
    res.status(200).json({ workoutSets });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getWorkoutSetById = async (req, res) => {
  try {
    const workoutSet = await WorkoutSet.findByPk(req.params.id);
    res.status(200).json({ workoutSet });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateWorkoutSet = async (req, res) => {
  try {
    const workoutSet = await WorkoutSet.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ workoutSet });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteWorkoutSet = async (req, res) => {
  try {
    await WorkoutSet.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'WorkoutSet deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
