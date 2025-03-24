# Resumo
Este projeto é uma solução para facilitar o controle de rotina e alimentação de atletas.
O objetivo principal é o atleta poder anotar todos os detalhes do seu treino no aplicativo, poder anotar suas respectivas dietas e metas como, por exemplo, consumo de água ou horas dormidas.
Ele foi desenvolvido para fornecer a funcionalidade de sincronizar os seus treinos com o seu descanso e dieta em uma só aplicação.

# Funcionalidades
* Cadastrar o usuário.
* Cadastrar o tipo de esporte/prática realizada.
* Cadastrar séries, pesos e tempo realizado.
* Cadastrar todas as refeições do dia.
* Criar e acompanhar suas metas como consumo diário de água ou quantidade de descanso/sono diário.

# Tecnologias
* Node.js
* Next.js
* Docker
* PostgreSQL

# Como executar o projeto
## Configuração e inicialização do backend
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor em modo desenvolvimento:
   ```sh
   npm run dev
   ```

## Executando o PostgreSQL com Docker Compose
1. Certifique-se de que o Docker esta instalado.
2. No diretório do projeto, execute:
   ```sh
   docker-compose up -d
   ```
   Isso iniciará um contêiner PostgreSQL rodando o banco de dados que sera utilizado no programa.

2. Apos o banco de dados estar funcionando com sucesso, execute:
   ```sh
   npx sequelize-cli db:migrate
   ```
   Isso criara as tabelas dentro do banco de dados.

4. Para parar os contêineres:
   ```sh
   docker-compose down
   ```

# Versões e atualizações

