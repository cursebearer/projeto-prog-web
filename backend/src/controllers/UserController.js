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
