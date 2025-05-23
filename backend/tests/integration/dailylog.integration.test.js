import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('DailyLog routes (integration)', () => {
  let token;
  let dailyLogId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    token = jwt.sign({ id: 1, email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /healthenv/dailylogs cria um daily log', async () => {
    const res = await request(app)
      .post('/healthenv/dailylogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: 1, data: '2024-01-01', agua_consumida: 2, horas_sono: 8 });
    expect(res.statusCode).toBe(200);
    expect(res.body.dailyLog).toHaveProperty('user_id', 1);
    dailyLogId = res.body.dailyLog.id;
  });

  it('GET /healthenv/dailylogs retorna todos os daily logs', async () => {
    const res = await request(app)
      .get('/healthenv/dailylogs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.dailyLogs)).toBe(true);
  });

  it('GET /healthenv/dailylogs/:id retorna um daily log', async () => {
    const res = await request(app)
      .get(`/healthenv/dailylogs/${dailyLogId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.dailylog).toHaveProperty('id', dailyLogId);
  });

  it('PUT /healthenv/dailylogs/:id atualiza um daily log', async () => {
    const res = await request(app)
      .put(`/healthenv/dailylogs/${dailyLogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ agua_consumida: 5 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Daily log atualizado com sucesso');
});

  it('DELETE /healthenv/dailylogs/:id deleta um daily log', async () => {
    const res = await request(app)
      .delete(`/healthenv/dailylogs/${dailyLogId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Daily log deleted successfully');
  });

  it('GET /healthenv/dailylogs/:id com id inexistente retorna 404', async () => {
    const res = await request(app)
      .get('/healthenv/dailylogs/99999')
      .set('Authorization', `Bearer ${token}`);
    expect([404, 400]).toContain(res.statusCode);
  });

  it('PUT /healthenv/dailylogs/:id com id inexistente retorna 400 ou 404', async () => {
    const res = await request(app)
      .put('/healthenv/dailylogs/99999')
      .set('Authorization', `Bearer ${token}`)
      .send({ agua_consumida: 1 });
      expect([400, 404]).toContain(res.statusCode);
  });

  it('DELETE /healthenv/dailylogs/:id com id inexistente retorna 200 ou 404', async () => {
    const res = await request(app)
      .delete('/healthenv/dailylogs/99999')
      .set('Authorization', `Bearer ${token}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /healthenv/dailylogs sem token retorna 401', async () => {
    const res = await request(app)
      .get('/healthenv/dailylogs');
    expect(res.statusCode).toBe(401);
  });
});