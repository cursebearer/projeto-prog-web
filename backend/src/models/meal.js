import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

class Meal extends Model {
  static associate(models) {

  }
}

Meal.init({
  daily_log_id: DataTypes.INTEGER,
  tipo_refeicao: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Meals',
});

export default Meal;