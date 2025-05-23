import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/dailylog.js', () => ({
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),      
    destroy: jest.fn(),     
  },
}));

const { default: DailyLog } = await import('../../src/models/dailylog.js');
const { createDailyLog, getAllDailyLogs, getDailyLogById } = await import('../../src/controllers/DailyLogController.js');

describe('DailyLogController (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { user_id: 1, data: '2024-01-01', agua_consumida: 2, horas_sono: 8 }, params: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve criar um daily log com sucesso', async () => {
    DailyLog.create.mockResolvedValue(req.body);
    await createDailyLog(req, res);
    expect(DailyLog.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ dailyLog: req.body });
  });

  it('deve retornar todos os daily logs', async () => {
    DailyLog.findAll.mockResolvedValue([req.body]);
    await getAllDailyLogs(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ dailyLogs: [req.body] });
  });

  it('deve retornar um daily log por id', async () => {
    DailyLog.findByPk.mockResolvedValue(req.body);
    await getDailyLogById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ dailylog: req.body });
  });

  it('deve retornar daily logs por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([req.body]);
    req.params.id = 1;
    const { getDailyLogsByUserId } = await import('../../src/controllers/DailyLogController.js');
    await getDailyLogsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([req.body]);
  });

  it('deve retornar 404 se não encontrar daily logs por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([]);
    req.params.id = 1;
    const { getDailyLogsByUserId } = await import('../../src/controllers/DailyLogController.js');
    await getDailyLogsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('deve tratar erro ao buscar daily logs por user_id', async () => {
    DailyLog.findAll.mockRejectedValue(new Error('DB error'));
    req.params.id = 1;
    const { getDailyLogsByUserId } = await import('../../src/controllers/DailyLogController.js');
    await getDailyLogsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('deve atualizar um daily log', async () => {
    DailyLog.update.mockResolvedValue([1]);
    req.body = { agua_consumida: 3 };
    req.params.id = 1;
    const { updateDailyLog } = await import('../../src/controllers/DailyLogController.js');
    await updateDailyLog(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve deletar um daily log', async () => {
    DailyLog.destroy.mockResolvedValue(1);
    req.params.id = 1;
    const { deleteDailyLog } = await import('../../src/controllers/DailyLogController.js');
    await deleteDailyLog(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});