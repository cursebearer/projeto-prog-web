#  Documentação do Projeto (HealthEnv)

##  1. Introdução
Documentação do projeto de Programação Web que tera o intuito de realizar um app de controle de rotina e alimentação de atletas, abordando seus requisitos, arquitetura, tecnologias escolhidas e plano de trabalho.

---

##  2. Requisitos

###  2.1 Requisitos Funcionais (RFs)
- **RF01**: Permitir o cadastro de usuario.
- **RF02**: Permitir o cadastro de tipos de esportes/práticas realizadas.
- **RF03**: Registrar séries, pesos e tempo dos treinos.
- **RF04**: Cadastrar refeições do dia.
- **RF05**: Acompanhar consumo diário de água e horas de sono.
- **RF06**: Gerar relatórios de progresso do atleta.
- **RF07**: Implementar um sistema de notificações para lembrar o usuário de treinos e refeições.
- **RF08**: Criar uma funcionalidade para exportar relatórios de desempenho em PDF/CSV.

###  2.2 Requisitos Não Funcionais (RNFs)
- **RNF01**: O sistema deve ser responsivo para dispositivos móveis.
- **RNF02**: O banco de dados deve garantir integridade e segurança dos dados.
- **RNF03**: As requisições ao servidor devem ter tempo de resposta inferior a 2 segundos.
- **RNF04**: Utilizar Docker para facilitar a implantação do ambiente.
- **RNF05**: Utilizar autenticação JWT para garantir a segurança dos usuários.
- **RNF06**: Implementar logs e monitoramento para rastrear falhas e acessos.
- **RNF07**: Criar testes automatizados para garantir a qualidade do código.

---

##  3. Estratégia de Desenvolvimento e Arquitetura

###  3.1 Tipo de Arquitetura
O sistema adotará uma **arquitetura monolítica** inicialmente, onde o backend, frontend e banco de dados estarão integrados. Caso necessário, poderá evoluir para uma abordagem **microservices** no futuro.

###  3.2 Tecnologias Utilizadas

| Tecnologia  | Usabilidade |
|-------------|------------------|
| **Next.js** | Permite Server Side Rendering (SSR), facilitando SEO e desempenho. |
| **Node.js** | Alta escalabilidade e compatibilidade com o ecossistema JavaScript. |
| **PostgreSQL** | Banco de dados relacional. |
| **Docker** | Implantação do ambiente. |

---

##  4. Plano de Trabalho

| Semana | Atividade |
|--------|-------------------------------------------------------------|
| 1 - 3  | Criar estrutura do banco de dados e desenvolver API REST  |
| 3 - 5 | Implementar o frontend baseado no design criado no Figma. |
| 5 - 6 | Realizar a integração o frontend com o backend. |
| 6 - 8  | Realizar testes, ajustes, implantação final e validações. |

---

##  5. Configuração do Repositório
Para garantir que a documentação esteja acessível, este arquivo **DOCUMENTACAO.md** deve ser incluído no repositório do projeto, dentro da pasta principal ou em uma pasta específica como `/docs`.

---

