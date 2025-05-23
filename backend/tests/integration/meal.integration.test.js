import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('Meal routes (integration)', () => {
  let token;
  let mealId;
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

  it('POST /healthenv/meals cria uma meal', async () => {
    const res = await request(app)
      .post('/healthenv/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({ daily_log_id, tipo_refeicao: 'Almoço' });
    expect(res.statusCode).toBe(200);
    expect(res.body.meal).toHaveProperty('tipo_refeicao', 'Almoço');
    mealId = res.body.meal.id;
  });

  it('GET /healthenv/meals retorna todas as meals', async () => {
    const res = await request(app)
      .get('/healthenv/meals')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.meals)).toBe(true);
  });

  it('GET /healthenv/meals/:id retorna uma meal', async () => {
    const res = await request(app)
      .get(`/healthenv/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.meal).toHaveProperty('id', mealId);
  });
});