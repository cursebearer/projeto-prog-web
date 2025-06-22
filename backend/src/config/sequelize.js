import { Sequelize } from 'sequelize';
import databaseConfig from './database.js';

import MealModel from '../models/meal.js';
import MealItemModel from '../models/mealItem.js';
import WorkoutSetModel from '../models/workoutSet.js';
import WorkoutModel from '../models/workout.js';

const sequelize = new Sequelize(databaseConfig);

// Inicializar os modelos
const Meal = MealModel(sequelize);
const MealItem = MealItemModel(sequelize);
const WorkoutSet = WorkoutSetModel(sequelize); // Inicializa o modelo com o Sequelize
const Workout = WorkoutModel(sequelize);

const models = { Meal, MealItem, WorkoutSet, Workout };

// Registrar as associações
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models); // Registra as associações
  }
});

export { Meal, MealItem, WorkoutSet, Workout };
export default sequelize;