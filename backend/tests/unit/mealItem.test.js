import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/mealitem.js', () => ({
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const { default: MealItem } = await import('../../src/models/mealItem.js');
const {
  createMealItem,
  getAllMealItems,
  getMealItemById,
  updateMealItem,
  deleteMealItem,
} = await import('../../src/controllers/MealItemController.js');

describe('MealItemController (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { meal_id: 1, nome_alimento: 'Arroz', quantidade: '100g' }, params: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve criar um meal item com sucesso', async () => {
    MealItem.create.mockResolvedValue(req.body);
    await createMealItem(req, res);
    expect(MealItem.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mealItem: req.body });
  });

  it('deve retornar todos os meal items', async () => {
    MealItem.findAll.mockResolvedValue([req.body]);
    await getAllMealItems(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mealItems: [req.body] });
  });

  it('deve retornar um meal item por id', async () => {
    MealItem.findByPk.mockResolvedValue(req.body);
    await getMealItemById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ mealItem: req.body });
  });

  it('deve atualizar um meal item', async () => {
    MealItem.update.mockResolvedValue([1]);
    req.body = { nome_alimento: 'Feijão' };
    req.params.id = 1;
    await updateMealItem(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve deletar um meal item', async () => {
    MealItem.destroy.mockResolvedValue(1);
    req.params.id = 1;
    await deleteMealItem(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'MealItem deleted successfully' });
  });
});