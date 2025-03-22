import MealItem from "../models/mealItem.js";

export const createMealItem = async (req, res) => {
  try {
    const mealItem = await MealItem.create(req.body);
    res.status(200).json({ mealItem });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllMealItems = async (req, res) => {
  try {
    const mealItems = await MealItem.findAll();
    res.status(200).json({ mealItems });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getMealItemById = async (req, res) => {
  try {
    const mealItem = await MealItem.findByPk(req.params.id);
    res.status(200).json({ mealItem });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateMealItem = async (req, res) => {
  try {
    const mealItem = await MealItem.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ mealItem });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteMealItem = async (req, res) => {
  try {
    const mealItem = await MealItem.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'MealItem deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
