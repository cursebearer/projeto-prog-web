import { WorkoutSet } from "../config/sequelize.js"; 

export const createWorkoutSet = async (req, res) => {
  try {
    const { workout_id, nome_exercicio, repeticoes, carga } = req.body;

    // Validação dos campos obrigatórios
    if (!workout_id || !nome_exercicio || !repeticoes || !carga) {
      return res.status(400).json({ message: "Campos obrigatórios estão faltando" });
    }

    const workoutSet = await WorkoutSet.create({
      workout_id,
      nome_exercicio,
      repeticoes,
      carga,
    });

    res.status(200).json({ workoutSet });
  } catch (err) {
    console.error("Erro ao criar WorkoutSet:", err);
    res.status(500).json({ message: "Erro ao criar WorkoutSet", error: err });
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

export const getWorkoutSetsByWorkoutId = async (req, res) => {
  try {
    const workoutSets = await WorkoutSet.findAll({
      where: { workout_id: req.params.workoutId },
    });
    res.status(200).json({ workoutSets });
  } catch (err) {
    res.status(400).json(err);
  }
};
