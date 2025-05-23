import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/workoutset.js', () => ({
  default: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const { default: WorkoutSet } = await import('../../src/models/workoutSet.js');
const {
  createWorkoutSet,
  getAllWorkoutSets,
  getWorkoutSetById,
  updateWorkoutSet,
  deleteWorkoutSet,
} = await import('../../src/controllers/WorkouSetController.js');

describe('WorkoutSetController (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { workout_id: 1, nome_exercicio: 'Supino', repeticoes: 10, carga: 40 }, params: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve criar um workout set com sucesso', async () => {
    WorkoutSet.create.mockResolvedValue(req.body);
    await createWorkoutSet(req, res);
    expect(WorkoutSet.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workoutSet: req.body });
  });

  it('deve retornar todos os workout sets', async () => {
    WorkoutSet.findAll.mockResolvedValue([req.body]);
    await getAllWorkoutSets(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workoutSets: [req.body] });
  });

  it('deve retornar um workout set por id', async () => {
    WorkoutSet.findByPk.mockResolvedValue(req.body);
    await getWorkoutSetById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workoutSet: req.body });
  });

  it('deve atualizar um workout set', async () => {
    WorkoutSet.update.mockResolvedValue([1]);
    req.body = { nome_exercicio: 'Remada' };
    req.params.id = 1;
    await updateWorkoutSet(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve deletar um workout set', async () => {
    WorkoutSet.destroy.mockResolvedValue(1);
    req.params.id = 1;
    await deleteWorkoutSet(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'WorkoutSet deleted successfully' });
  });
});