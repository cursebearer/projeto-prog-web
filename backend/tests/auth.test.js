import request from 'supertest';
import { app, sequelize } from '../src/server.js'; 

beforeAll(async () => {
  await sequelize.sync({ force: true });  
});

describe('Auth Endpoints', () => {
  it('deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app).post('/healthenv/auth/register').send({
      nome: 'João',
      email: 'joao@email.com',
      senha: '1234567'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Usuário registrado com sucesso');
  });

  it('não deve permitir email duplicado', async () => {
    await request(app).post('/healthenv/auth/register').send({
      nome: 'João2',
      email: 'joao@email.com',
      senha: 'abcdef'
    });

    const res = await request(app).post('/healthenv/auth/register').send({
      nome: 'João2',
      email: 'joao@email.com',
      senha: 'abcdef'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email já cadastrado');
  });

  it('não deve permitir registro com campos vazios', async () => {
    const res = await request(app).post('/healthenv/auth/register').send({
      nome: '',
      email: '',
      senha: ''
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Todos os campos são obrigatórios');
  });

  it('deve fazer login com sucesso', async () => {
    const res = await request(app).post('/healthenv/auth/login').send({
      email: 'joao@email.com',
      senha: '1234567'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });

  it('não deve logar com senha incorreta', async () => {
    const res = await request(app).post('/healthenv/auth/login').send({
      email: 'joao@email.com',
      senha: 'errada'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Credenciais inválidas');
  });
});
