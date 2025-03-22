import express from "express";
import userRoutes from "./userRoutes.js";
import dailyLogRoutes from "./dailyLogRoutes.js"; 

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Servidor rodando" });
});

router.use("/users", userRoutes);
router.use("/logs", dailyLogRoutes);

export default router;
