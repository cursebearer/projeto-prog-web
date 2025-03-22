import express from "express";
import { 
  createDailyLog, 
  getAllDailyLogs, 
  getDailyLogById, 
  updateDailyLog, 
  deleteDailyLog 
} from "../controllers/DailyLogController.js";

const router = express.Router();

router.post("/", createDailyLog);
router.get("/", getAllDailyLogs);
router.get("/:id", getDailyLogById);
router.put("/:id", updateDailyLog);
router.delete("/:id", deleteDailyLog);

export default router;
