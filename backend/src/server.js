import express from 'express';
import sequelize from './config/database.js'; 
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/healthenv', router);

const port = 3000;

sequelize
.authenticate()
.then( () => {
    console.log("Banco de dados conectado")
    app.listen(port, () => {
        console.log("Servidor rodando na porta " + port);
      })
})
.catch( (err) => {
    console.log("Erro ao conectar banco de dados", error)
})
