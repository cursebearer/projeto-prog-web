import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class DailyLog extends Model {
  static associate(models) {

  }
}

DailyLog.init({
  user_id: DataTypes.INTEGER,
  data: DataTypes.DATE,
  agua_consumida: DataTypes.DECIMAL,
  horas_sono: DataTypes.DECIMAL,
}, {
  sequelize,
  modelName: 'DailyLog',
});

export default DailyLog;
