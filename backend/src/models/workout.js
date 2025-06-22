import { Model, DataTypes } from 'sequelize';

class Workout extends Model {
  static associate(models) {
    this.hasMany(models.WorkoutSet, { as: 'workout_sets', foreignKey: 'workout_id' });
  }
}

export default (sequelize) => {
  Workout.init({
    daily_log_id: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Workout',
    tableName: 'Workouts', 
  });

  return Workout;
};