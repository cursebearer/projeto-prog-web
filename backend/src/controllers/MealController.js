import { Meal, MealItem } from "../config/sequelize.js"; 
import DailyLog from "../models/dailylog.js";

export const createMeal = async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(200).json({ meal });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll();
    res.status(200).json({ meals });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findByPk(req.params.id);
    res.status(200).json({ meal });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getMealsByUserId = async (req, res) => {
  try {
    const { id } = req.params; 

    const dailyLogs = await DailyLog.findAll({ where: { user_id: id } });
    const dailyLogIds = dailyLogs.map(dl => dl.id);

    if (dailyLogIds.length === 0) {
      return res.status(404).json({ message: "Nenhum meal encontrado para este usuário" });
    }

    const meals = await Meal.findAll({
      where: { daily_log_id: dailyLogIds },
      include: [
        {
          model: MealItem,
          as: "meal_items", 
        },
      ],
    });

    res.status(200).json(meals);
  } catch (error) {
    console.error("Erro ao buscar refeições:", error);
    res.status(500).json({ message: "Erro ao buscar refeições", error });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ meal });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteMeal = async (req, res) => {
  try {
    await Meal.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
