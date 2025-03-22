import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

class MealItem extends Model {
  static associate(models) {

  }
}

MealItem.init({
  meal_id: DataTypes.INTEGER,
  nome_alimento: DataTypes.STRING,
  quantidade: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Meal_items',
});

export default MealItem;