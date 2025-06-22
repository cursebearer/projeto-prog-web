import { Model, DataTypes } from 'sequelize';

class MealItem extends Model {
  static associate(models) {
    this.belongsTo(models.Meal, { foreignKey: 'meal_id' });
  }
}

export default (sequelize) => {
  MealItem.init({
    meal_id: DataTypes.INTEGER,
    nome_alimento: DataTypes.STRING,
    quantidade: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MealItem',
    tableName: 'Meal_items', 
  });

  return MealItem;
};