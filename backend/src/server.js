import express from 'express';
import cors from 'cors'; 
import sequelize from './config/sequelize.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/healthenv', router);

const port = 5000;

if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Banco de dados conectado");
      app.listen(port, () => {
        console.log("Servidor rodando na porta " + port);
      });
    })
    .catch((error) => {
      console.log("Erro ao conectar banco de dados", error);
    });
}

export { app, sequelize };