#  Documentação do Projeto (HealthEnv)

##  1. Introdução
Este documento apresenta os detalhes do desenvolvimento do projeto de **controle de rotina e alimentação de atletas**, abordando seus requisitos, arquitetura, tecnologias escolhidas e plano de trabalho.

---

##  2. Requisitos

###  2.1 Requisitos Funcionais (RFs)
- **RF01**: Permitir o cadastro de tipos de esportes/práticas realizadas.
- **RF02**: Registrar séries, pesos e tempo dos treinos.
- **RF03**: Cadastrar refeições do dia.
- **RF04**: Acompanhar consumo diário de água e horas de sono.
- **RF05**: Gerar relatórios de progresso do atleta.

### ⚙️ 2.2 Requisitos Não Funcionais (RNFs)
- **RNF01**: O sistema deve ser responsivo para dispositivos móveis.
- **RNF02**: O banco de dados deve garantir integridade e segurança dos dados.
- **RNF03**: As requisições ao servidor devem ter tempo de resposta inferior a 2 segundos.
- **RNF04**: Utilizar Docker para facilitar a implantação do ambiente.

---

##  3. Estratégia de Desenvolvimento e Arquitetura

###  3.1 Tipo de Arquitetura
O sistema adotará uma **arquitetura monolítica** inicialmente, onde o backend, frontend e banco de dados estarão integrados. Caso necessário, poderá evoluir para uma abordagem **microservices** no futuro.

### 🛠️ 3.2 Tecnologias Utilizadas

| Tecnologia  | Motivo da Escolha |
|-------------|------------------|
| **Next.js** | Permite Server Side Rendering (SSR), facilitando SEO e desempenho. |
| **Node.js** | Alta escalabilidade e compatibilidade com o ecossistema JavaScript. |
| **PostgreSQL** | Banco de dados relacional confiável e robusto. |
| **Docker** | Facilita a implantação do ambiente e isolamento de dependências. |

---

##  4. Plano de Trabalho

| Semana | Atividade |
|--------|-------------------------------------------------------------|
| 1 - 2  | Criar estrutura do banco de dados e desenvolver API REST. |
| 3 - 4  | Implementar o frontend inicial (cadastro de treinos e refeições). |
| 5 - 6  | Criar dashboard de acompanhamento com gráficos e relatórios. |
| 7 - 8  | Realizar testes, ajustes e implantação final. |

---

##  5. Configuração do Repositório
Para garantir que a documentação esteja acessível, este arquivo **DOCUMENTACAO.md** deve ser incluído no repositório do projeto, dentro da pasta principal ou em uma pasta específica como `/docs`.

---

