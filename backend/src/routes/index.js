import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Servidor rodando' });
});

router.use('/users', userRoutes);       

export default router;