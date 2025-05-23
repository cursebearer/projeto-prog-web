import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/meal.js', () => ({
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));
jest.unstable_mockModule('../../src/models/dailylog.js', () => ({
  default: {
    findAll: jest.fn(),
  },
}));

const { default: Meal } = await import('../../src/models/meal.js');
const { default: DailyLog } = await import('../../src/models/dailylog.js');
const {
  createMeal,
  getAllMeals,
  getMealById,
  getMealsByUserId,
  updateMeal,
  deleteMeal,
} = await import('../../src/controllers/MealController.js');

describe('MealController (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { daily_log_id: 1, tipo_refeicao: 'Almoço' }, params: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve criar uma meal com sucesso', async () => {
    Meal.create.mockResolvedValue(req.body);
    await createMeal(req, res);
    expect(Meal.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ meal: req.body });
  });

  it('deve retornar todas as meals', async () => {
    Meal.findAll.mockResolvedValue([req.body]);
    await getAllMeals(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ meals: [req.body] });
  });

  it('deve retornar uma meal por id', async () => {
    Meal.findByPk.mockResolvedValue(req.body);
    await getMealById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ meal: req.body });
  });

  it('deve retornar meals por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([{ id: 1 }]);
    Meal.findAll.mockResolvedValue([req.body]);
    req.params.id = 1;
    await getMealsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([req.body]);
  });

  it('deve retornar 404 se não encontrar meals por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([]);
    req.params.id = 1;
    await getMealsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('deve tratar erro ao buscar meals por user_id', async () => {
    DailyLog.findAll.mockRejectedValue(new Error('DB error'));
    req.params.id = 1;
    await getMealsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('deve atualizar uma meal', async () => {
    Meal.update.mockResolvedValue([1]);
    req.body = { tipo_refeicao: 'Jantar' };
    req.params.id = 1;
    await updateMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve deletar uma meal', async () => {
    Meal.destroy.mockResolvedValue(1);
    req.params.id = 1;
    await deleteMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Meal deleted successfully' });
  });
});