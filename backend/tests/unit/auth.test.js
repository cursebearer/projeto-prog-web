import { jest } from '@jest/globals';

jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    hash: jest.fn(),
  },
}));

jest.unstable_mockModule('../../src/models/user.js', () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const { default: bcrypt } = await import('bcryptjs');
const { registerUser } = await import('../../src/controllers/authController.js');
const { default: User } = await import('../../src/models/user.js');

describe('registerUser (unit)', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        nome: 'Teste',
        email: 'teste@example.com',
        senha: 'senha123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({});

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(User.create).toHaveBeenCalledWith({
      nome: req.body.nome,
      email: req.body.email,
      senha: 'hashedPassword',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário registrado com sucesso' });
  });

  it('deve retornar erro se campos estiverem vazios', async () => {
    req.body = { nome: '', email: '', senha: '' };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios' });
  });

  it('deve retornar erro se o email já estiver cadastrado', async () => {
    User.findOne.mockResolvedValue({ id: 1 });

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
  });

  it('deve lidar com erro interno do servidor', async () => {
    User.findOne.mockRejectedValue(new Error('Erro no banco'));

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Erro no servidor',
    }));
  });
});
