import Workout from "../models/workout.js";
import DailyLog from "../models/dailylog.js";

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

export const getWorkoutsByUserId = async (req, res) => {
  try {
    const { id } = req.params; 

    const dailyLogs = await DailyLog.findAll({ where: { user_id: id } });
    const dailyLogIds = dailyLogs.map(dl => dl.id);

    if (dailyLogIds.length === 0) {
      return res.status(404).json({ message: "Nenhum workout encontrado para este usuário" });
    }

    const workouts = await Workout.findAll({ where: { daily_log_id: dailyLogIds } });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar workouts", error });
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
    await Workout.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};