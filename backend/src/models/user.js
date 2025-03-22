import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

class User extends Model {
  static associate(models) {
    
  }
}

User.init({
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

export default User;