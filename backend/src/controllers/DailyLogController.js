import DailyLog from "../models/dailylog.js";

export const createDailyLog = async (req, res) => {
  try {
    const dailyLog = await DailyLog.create(req.body);
    res.status(200).json({ dailyLog });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllDailyLogs = async (req, res) => {
  try {
    const dailyLogs = await DailyLog.findAll();
    res.status(200).json({ dailyLogs });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getDailyLogById = async (req, res) => {
  try {
    const dailylog = await DailyLog.findByPk(req.params.id);
    res.status(200).json({ dailylog });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getDailyLogsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyLogs = await DailyLog.findAll({ where: { user_id: id } });
    if (!dailyLogs || dailyLogs.length === 0) {
      return res.status(404).json({ message: "Nenhum daily log encontrado para este usuário" });
    }
    res.status(200).json(dailyLogs);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar daily logs", error });
  }
};

export const updateDailyLog = async (req, res) => {
  try {
    const dailyLog = await DailyLog.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ dailyLog });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteDailyLog = async (req, res) => {
  try {
    const dailyLog = await DailyLog.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: 'Daily log deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
};
