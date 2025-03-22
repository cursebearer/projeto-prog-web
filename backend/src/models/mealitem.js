import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

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
  modelName: 'MealItem',
});

export default MealItem;
