import { Sequelize } from "sequelize";
import dbConfig from "./config/dbConfig.js"; 

const sequelize = new Sequelize(dbConfig);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

connectDB();

export default sequelize;
