import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('Workout routes (integration)', () => {
  let token;
  let workoutId;
  let daily_log_id;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    token = jwt.sign({ id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
    const dailyLogRes = await request(app)
      .post('/healthenv/dailylogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, data: '2024-01-01', agua_consumida: 2, horas_sono: 8 });
    daily_log_id = dailyLogRes.body.dailyLog.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /healthenv/workouts cria um workout', async () => {
    const res = await request(app)
      .post('/healthenv/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({ daily_log_id, titulo: 'Treino A' });
    expect(res.statusCode).toBe(200);
    expect(res.body.workout).toHaveProperty('titulo', 'Treino A');
    workoutId = res.body.workout.id;
  });

  it('GET /healthenv/workouts retorna todos os workouts', async () => {
    const res = await request(app)
      .get('/healthenv/workouts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.workouts)).toBe(true);
  });

  it('GET /healthenv/workouts/:id retorna um workout', async () => {
    const res = await request(app)
      .get(`/healthenv/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.workout).toHaveProperty('id', workoutId);
  });
});