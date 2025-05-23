import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('MealItem routes (integration)', () => {
  let token;
  let mealItemId;
  let meal_id;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    token = jwt.sign({ id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
    const dailyLogRes = await request(app)
      .post('/healthenv/dailylogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, data: '2024-01-01', agua_consumida: 2, horas_sono: 8 });
    const daily_log_id = dailyLogRes.body.dailyLog.id;
    const mealRes = await request(app)
      .post('/healthenv/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({ daily_log_id, tipo_refeicao: 'Almoço' });
    meal_id = mealRes.body.meal.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /healthenv/mealitems cria um meal item', async () => {
    const res = await request(app)
      .post('/healthenv/mealitems')
      .set('Authorization', `Bearer ${token}`)
      .send({ meal_id, nome_alimento: 'Arroz', quantidade: '100g' });
    expect(res.statusCode).toBe(200);
    expect(res.body.mealItem).toHaveProperty('nome_alimento', 'Arroz');
    mealItemId = res.body.mealItem.id;
  });

  it('GET /healthenv/mealitems retorna todos os meal items', async () => {
    const res = await request(app)
      .get('/healthenv/mealitems')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.mealItems)).toBe(true);
  });

  it('GET /healthenv/mealitems/:id retorna um meal item', async () => {
    const res = await request(app)
      .get(`/healthenv/mealitems/${mealItemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mealItem).toHaveProperty('id', mealItemId);
  });
});