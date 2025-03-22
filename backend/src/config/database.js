import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost", 
  username: "healthenv",
  password: "healthenv",
  database: "healthenv",
});

export default sequelize;