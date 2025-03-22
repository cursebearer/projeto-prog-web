import User from "../models/user.js";

export const createUser = async (req, res) => {

  try {
      const userToCreate = {
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
      }
  
      const user = await User.create(userToCreate);
  
      res.status(200).json({ user });
  
  } catch (err) {
      res.status(400).json(err);
  }
};

export const getAllUsers = async (req, res) => {

  try{
      const users = await User.findAll();

      res.status(200).json({ users });
  } catch (err) {
      res.status(400).json(err);
  }
};

export const getUserById = async (req, res) => {

    try {
        const user = await User.findByPk(req.params.id);

        res.status(200).json({ user });
   } catch (err) {
        res.status(400).json(err);
   }
};

export const updateUser = async (req, res) => {

    try {
        const user = await User.update(
            {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json(err);
    }
}

export const deleteUser = async (req, res) => {

    try {
     const user = await User.destroy({
         where: {
             id: req.params.id,
         },
         });
     
         res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
     res.status(400).json(err);
    }
 };