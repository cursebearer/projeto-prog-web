import express from "express";
import { 
  createDailyLog, 
  getAllDailyLogs, 
  getDailyLogById, 
  updateDailyLog, 
  deleteDailyLog 
} from "../controllers/DailyLogController.js";

const router = express.Router();

router.post("/dailylog", createDailyLog);
router.get("/dailylogs", getAllDailyLogs);
router.get("/dailylog/:id", getDailyLogById);
router.put("/dailylog/:id", updateDailyLog);
router.delete("/dailylog/:id", deleteDailyLog);

export default router;
