import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class WorkoutSet extends Model {
  static associate(models) {

  }
}

WorkoutSet.init({
  workout_id: DataTypes.INTEGER,
  nome_exercicio: DataTypes.STRING,
  repeticoes: DataTypes.INTEGER,
  carga: DataTypes.DECIMAL,
}, {
  sequelize,
  modelName: 'WorkoutSet',
});

export default WorkoutSet;
