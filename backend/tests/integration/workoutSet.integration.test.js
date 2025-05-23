import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('WorkoutSet routes (integration)', () => {
  let token;
  let workoutSetId;
  let workout_id;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    token = jwt.sign({ id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
    const dailyLogRes = await request(app)
      .post('/healthenv/dailylogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, data: '2024-01-01', agua_consumida: 2, horas_sono: 8 });
    const daily_log_id = dailyLogRes.body.dailyLog.id;
    const workoutRes = await request(app)
      .post('/healthenv/workouts')
      .set('Authorization', `Bearer ${token}`)
      .send({ daily_log_id, titulo: 'Treino A' });
    workout_id = workoutRes.body.workout.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /healthenv/workoutsets cria um workout set', async () => {
    const res = await request(app)
      .post('/healthenv/workoutsets')
      .set('Authorization', `Bearer ${token}`)
      .send({ workout_id, nome_exercicio: 'Supino', repeticoes: 10, carga: 40 });
    expect(res.statusCode).toBe(200);
    expect(res.body.workoutSet).toHaveProperty('nome_exercicio', 'Supino');
    workoutSetId = res.body.workoutSet.id;
  });

  it('GET /healthenv/workoutsets retorna todos os workout sets', async () => {
    const res = await request(app)
      .get('/healthenv/workoutsets')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.workoutSets)).toBe(true);
  });

  it('GET /healthenv/workoutsets/:id retorna um workout set', async () => {
    const res = await request(app)
      .get(`/healthenv/workoutsets/${workoutSetId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.workoutSet).toHaveProperty('id', workoutSetId);
  });
});