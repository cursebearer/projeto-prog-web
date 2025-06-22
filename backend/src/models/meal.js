import { Model, DataTypes } from 'sequelize';

class Meal extends Model {
  static associate(models) {
    this.hasMany(models.MealItem, { as: 'meal_items', foreignKey: 'meal_id' });
  }
}

export default (sequelize) => {
  Meal.init({
    daily_log_id: DataTypes.INTEGER,
    tipo_refeicao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Meal',
    tableName: 'Meals', 
  });

  return Meal;
};