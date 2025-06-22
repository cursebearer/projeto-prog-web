import { Sequelize } from 'sequelize';
import databaseConfig from './database.js';

import MealModel from '../models/meal.js';
import MealItemModel from '../models/mealItem.js';
import WorkoutModel from '../models/workout.js';
import WorkoutSetModel from '../models/workoutSet.js';

const sequelize = new Sequelize(databaseConfig);

// Inicializar os modelos
const Meal = MealModel(sequelize);
const MealItem = MealItemModel(sequelize);
const Workout = WorkoutModel(sequelize);
const WorkoutSet = WorkoutSetModel(sequelize);

const models = { Meal, MealItem, Workout, WorkoutSet };

// Registrar as associações
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { Meal, MealItem, Workout, WorkoutSet };
export default sequelize;