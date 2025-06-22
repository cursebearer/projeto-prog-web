import { Model, DataTypes } from 'sequelize';

class WorkoutSet extends Model {
  static associate(models) {
    this.belongsTo(models.Workout, { foreignKey: 'workout_id' });
  }
}

export default (sequelize) => {
  WorkoutSet.init({
    workout_id: DataTypes.INTEGER,
    nome_exercicio: DataTypes.STRING,
    repeticoes: DataTypes.INTEGER,
    carga: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'WorkoutSet',
    tableName: 'Workout_sets', 
  });

  return WorkoutSet;
};