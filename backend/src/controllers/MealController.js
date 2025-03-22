import Meal from "../models/meal.js";

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
    const meal = await Meal.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
