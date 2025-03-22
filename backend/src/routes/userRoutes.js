import express from 'express';
import { createUser, getAllUsers } from '../controllers/UserController.js';

const router = express.Router();

router.post('/cadastro', createUser);

router.get('/usuarios', getAllUsers); 


export default router;