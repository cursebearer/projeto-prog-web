import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class Meal extends Model {
  static associate(models) {

  }
}

Meal.init({
  daily_log_id: DataTypes.INTEGER,
  tipo_refeicao: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Meal',
});

export default Meal;
