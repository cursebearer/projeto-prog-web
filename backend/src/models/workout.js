import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class Workout extends Model {
  static associate(models) {

  }
}

Workout.init({
  daily_log_id: DataTypes.INTEGER,
  titulo: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Workout',
});

export default Workout;
