import express from "express";
import { 
  createDailyLog, 
  getAllDailyLogs, 
  getDailyLogsByUserId, // Nome atualizado
  updateDailyLog, 
  deleteDailyLog 
} from "../controllers/DailyLogController.js";

const router = express.Router();

router.post("/", createDailyLog);
router.get("/", getAllDailyLogs);
router.get("/user/:id", getDailyLogsByUserId); 
router.put("/:id", updateDailyLog);
router.delete("/:id", deleteDailyLog);

export default router;
