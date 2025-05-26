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
* Sassy CSS
* Docker
* PostgreSQL

# Como executar o projeto

## Executando o PostgreSQL com Docker Compose
1. Certifique-se de que o Docker esta instalado.
2. No diretório do projeto, execute:
   ```sh
   docker-compose up -d
   ```
   Isso iniciará um contêiner PostgreSQL rodando o banco de dados que sera utilizado no programa.

3. Apos o banco de dados estar funcionando com sucesso, execute:
   ```sh
   npx sequelize-cli db:migrate
   ```
   Isso criara as tabelas dentro do banco de dados de desenvolvimento.

4. Rode as migrations para o banco de testes:

   No PowerShell (Windows):
   ```sh
   $env:NODE_ENV="test"; npx sequelize-cli db:migrate
   ```
   
    No CMD (Prompt de Comando):
   ```sh
   set NODE_ENV=test && npx sequelize-cli db:migrate
   ```

    No Linux/macOS:
   ```sh
   NODE_ENV=test npx sequelize-cli db:migrate
   ```
   Isso garante que as tabelas também sejam criadas no banco de teste (healthenv_test).

5. Execute os testes normalmente:
   ```sh
   npm test
   ```
   
6. Para parar os contêineres:
   ```sh
   docker-compose down
   ```
   
## Configuração e inicialização do projeto

1. Clone o repositório e entre no backend:
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

## Configuração e inicialização do frontend

1. Instale as dependências e entre frontend:
   ```sh
   cd frontend
   npm install
   ```
3. Inicie o servidor em modo desenvolvimento:
   ```sh
   npm run dev
   ```

# Versões e atualizações

