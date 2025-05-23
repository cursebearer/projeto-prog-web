import { jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/workout.js', () => ({
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

const { default: Workout } = await import('../../src/models/workout.js');
const { default: DailyLog } = await import('../../src/models/dailylog.js');
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  getWorkoutsByUserId,
  updateWorkout,
  deleteWorkout,
} = await import('../../src/controllers/WorkoutController.js');

describe('WorkoutController (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { daily_log_id: 1, titulo: 'Treino A' }, params: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it('deve criar um workout com sucesso', async () => {
    Workout.create.mockResolvedValue(req.body);
    await createWorkout(req, res);
    expect(Workout.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workout: req.body });
  });

  it('deve retornar todos os workouts', async () => {
    Workout.findAll.mockResolvedValue([req.body]);
    await getAllWorkouts(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workouts: [req.body] });
  });

  it('deve retornar um workout por id', async () => {
    Workout.findByPk.mockResolvedValue(req.body);
    await getWorkoutById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ workout: req.body });
  });

  it('deve retornar workouts por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([{ id: 1 }]);
    Workout.findAll.mockResolvedValue([req.body]);
    req.params.id = 1;
    await getWorkoutsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([req.body]);
  });

  it('deve retornar 404 se não encontrar workouts por user_id', async () => {
    DailyLog.findAll.mockResolvedValue([]);
    req.params.id = 1;
    await getWorkoutsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('deve tratar erro ao buscar workouts por user_id', async () => {
    DailyLog.findAll.mockRejectedValue(new Error('DB error'));
    req.params.id = 1;
    await getWorkoutsByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('deve atualizar um workout', async () => {
    Workout.update.mockResolvedValue([1]);
    req.body = { titulo: 'Treino B' };
    req.params.id = 1;
    await updateWorkout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('deve deletar um workout', async () => {
    Workout.destroy.mockResolvedValue(1);
    req.params.id = 1;
    await deleteWorkout(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});