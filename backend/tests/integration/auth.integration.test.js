import request from 'supertest';
import { app } from '../../src/server.js';
import sequelize from '../../src/config/sequelize.js';

describe('Auth routes (integration)', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /healthenv/auth/register cadastra um novo usuário', async () => {
    const res = await request(app)
      .post('/healthenv/auth/register')
      .send({ nome: 'Teste', email: 'teste@exemplo.com', senha: '123456' });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('message', 'Usuário registrado com sucesso');
  });

  it('POST /healthenv/auth/login faz login e retorna token', async () => {
    const res = await request(app)
      .post('/healthenv/auth/login')
      .send({ email: 'teste@exemplo.com', senha: '123456' });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('token');
  });
});