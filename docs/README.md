# CV-API - API Backend para Aplicação de Currículos

API RESTful desenvolvida em Node.js e Express para gerenciamento de currículos e perfis profissionais. Desenvolvida para suportar uma aplicação mobile React Native.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Início Rápido](#início-rápido)
- [Princípios Aplicados](#princípios-aplicados)

## Sobre o Projeto

A CV-API é uma API backend completa para gerenciamento de currículos profissionais. Permite criar e gerenciar perfis, experiências profissionais, formações acadêmicas, projetos, habilidades e links sociais.

### Funcionalidades

- CRUD completo para todas as entidades
- Validação de dados com Zod
- Tratamento robusto de erros
- Arquitetura em camadas (SOLID)
- Relacionamentos complexos (1-n e m-n)
- Seed com dados de exemplo

## Tecnologias

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **ORM:** Drizzle ORM
- **Banco de Dados:** Neon (PostgreSQL serverless)
- **Validação:** Zod
- **Deploy:** Vercel-ready

## Arquitetura

A aplicação segue uma arquitetura em camadas, separando responsabilidades:

```
┌─────────────────┐
│   Controllers   │  ← Camada Web (HTTP)
├─────────────────┤
│    Services     │  ← Camada de Negócios
├─────────────────┤
│  Repositories   │  ← Camada de Dados
├─────────────────┤
│  Drizzle ORM    │  ← Acesso ao Banco
└─────────────────┘
```

### Camadas

1. **Controllers:** Recebem requisições HTTP, validam dados e retornam respostas
2. **Services:** Contêm a lógica de negócios e orquestram operações
3. **Repositories:** Abstraem o acesso ao banco de dados via Prisma
4. **Schemas:** Definem validações com Zod

### Princípios Aplicados

- **SOLID:** Separação de responsabilidades, inversão de dependências
- **DRY:** Código reutilizável, sem duplicação
- **Componentização:** Módulos independentes e testáveis

## Estrutura do Projeto

```
cv-api/
├── drizzle/
│   ├── migrations/         # Migrações do banco de dados
│   ├── schema.ts           # Schema do Drizzle
│   └── seed.ts             # Script de seed
├── src/
│   ├── config/             # Configurações (DB client)
│   ├── controllers/        # Controladores HTTP
│   ├── middlewares/        # Middlewares (error handler)
│   ├── repositories/       # Camada de acesso a dados
│   ├── routes/             # Definição de rotas
│   ├── schemas/            # Schemas de validação Zod
│   ├── services/          # Lógica de negócios
│   ├── utils/             # Utilitários
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Ponto de entrada
├── docs/                   # Documentação
│   ├── API.md             # Documentação completa da API
│   ├── INSTALLATION.md    # Guia de instalação
│   └── README.md          # Este arquivo
├── drizzle.config.ts       # Configuração Drizzle
├── package.json           # Dependências
└── tsconfig.json           # Configuração TypeScript
```

## Documentação

- **[Guia de Instalação](./INSTALLATION.md)** - Passo a passo para configurar o projeto
- **[Documentação da API](./API.md)** - Referência completa de todos os endpoints
- **[Arquitetura](./architecture.md)** - Detalhes da arquitetura do projeto

## Início Rápido

### Pré-requisitos

- Node.js 18+
- Conta no Neon (banco de dados serverless)
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados Neon e as variáveis de ambiente (veja [INSTALLATION.md](./INSTALLATION.md))

4. Aplique as migrações:
   ```bash
   npm run db:push
   ```

5. Popule o banco de dados:
   ```bash
   npm run db:seed
   ```

7. Inicie o servidor:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`

Para mais detalhes, consulte o [Guia de Instalação](./INSTALLATION.md).

## Princípios Aplicados

### SOLID

- **S**ingle Responsibility: Cada classe/função tem uma única responsabilidade
- **O**pen/Closed: Extensível sem modificar código existente
- **L**iskov Substitution: Interfaces consistentes
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Dependências abstraídas

### DRY (Don't Repeat Yourself)

- Validações centralizadas com Zod
- Middleware de erro reutilizável
- Funções utilitárias compartilhadas

### Componentização

- Módulos independentes por entidade
- Separação clara de responsabilidades
- Fácil manutenção e testes

## Modelo de Dados

### Entidades Principais

- **Profile:** Perfil/currículo do usuário
- **Experience:** Experiências profissionais
- **Education:** Formações acadêmicas
- **Project:** Projetos do portfólio
- **SocialLink:** Links sociais (LinkedIn, GitHub, etc.)
- **Skill:** Habilidades (taxonomia m-n)

### Relacionamentos

- Profile → Experience (1-n)
- Profile → Education (1-n)
- Profile → Project (1-n)
- Profile → SocialLink (1-n)
- Profile ↔ Skill (m-n)

## Testando a API

Use a coleção Postman fornecida (`docs/CV-API.postman_collection.json`) ou faça requisições manualmente.

### Exemplo: Health Check

```bash
curl http://localhost:3000/health
```

### Exemplo: Listar Perfis

```bash
curl http://localhost:3000/api/v1/profiles
```

## Scripts Disponíveis

- `npm run dev` - Inicia em modo desenvolvimento
- `npm run build` - Compila TypeScript
- `npm start` - Inicia em modo produção
- `npm run db:generate` - Gera migrações do Drizzle
- `npm run db:migrate` - Executa migrações versionadas
- `npm run db:push` - Aplica schema diretamente ao banco
- `npm run db:seed` - Popula o banco de dados
- `npm run db:studio` - Abre o Drizzle Studio
- `npm run type-check` - Verifica tipos TypeScript
- `npm run lint` - Executa o linter

## Segurança

**Nota:** Esta versão não inclui autenticação/autorização.

- Autenticação JWT
- Rate limiting
- Validação de entrada mais rigorosa
- Sanitização de dados
- HTTPS

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto não possui licença específica, sendo desenvolvido no contexto acadêmico como projeto da disciplina Aplicações Orientadas a Serviços do curso de Sistemas para Internet da Universidade Católica de Pernambuco (UNICAP).

## Autor

Desenvolvido como parte de um projeto de aplicação mobile de currículos por Anderson M. S. Marinho.

---

Para mais informações, consulte a [Documentação Completa da API](./API.md).
