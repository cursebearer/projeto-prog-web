import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/UserController.js';

const router = express.Router();

router.post('/usuario', createUser);
router.get('/usuarios', getAllUsers); 
router.get('/usuario/:id', getUserById);
router.put('/usuario/:id', updateUser); 
router.delete('/usuario/:id', deleteUser);


export default router;