# Guia de Instalação - CV-API

Este guia fornece instruções passo a passo para configurar e executar a aplicação CV-API.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Conta no Neon** (banco de dados PostgreSQL serverless) - [Criar conta gratuita](https://neon.tech)
- **Git** (para clonar o repositório)

## Passo 1: Clonar o Repositório

```bash
git clone https://github.com/andersonmsmarinho/cv-api.git
cd cv-api
```

## Passo 2: Instalar Dependências

```bash
npm install
```

## Passo 3: Configurar Banco de Dados Neon

### 3.1. Criar Projeto no Neon

1. Acesse [https://neon.tech](https://neon.tech) e crie uma conta (se ainda não tiver)
2. Crie um novo projeto
3. Copie a **Connection String** fornecida pelo Neon

### 3.2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
PORT=3000
NODE_ENV=development
```

**Importante:** Substitua a `DATABASE_URL` pela connection string fornecida pelo Neon.

## Passo 4: Configurar o Banco de Dados

### 4.1. Gerar Migrações

```bash
npm run db:generate
```

Isso criará os arquivos de migração baseados no schema do Drizzle.

### 4.2. Aplicar Migrações ao Banco

```bash
npm run db:push
```

Isso criará todas as tabelas no banco de dados Neon.

**Alternativa:** Se preferir usar migrações versionadas:

```bash
npm run db:migrate
```

### 4.3. Popular o Banco de Dados (Seed)

```bash
npm run db:seed
```

Isso criará 2 perfis de exemplo com todos os relacionamentos.

## Passo 5: Executar a Aplicação

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Modo Produção

Primeiro, compile o TypeScript:

```bash
npm run build
```

Depois, execute:

```bash
npm start
```

## Passo 6: Verificar a Aplicação

### Health Check

Acesse:

```
GET http://localhost:3000/health
```

Você deve receber:

```json
{
  "status": "OK"
}
```

### Testar Endpoints

Use a coleção Postman fornecida (`docs/CV-API.postman_collection.json`) ou faça requisições manualmente.

## Comandos Úteis

### Drizzle Studio

Visualize e edite dados do banco de dados através de uma interface gráfica:

```bash
npm run db:studio
```

Acesse `http://localhost:4983` no navegador.

### Verificar Tipos TypeScript

```bash
npm run type-check
```

### Lint do Código

```bash
npm run lint
```

## Estrutura de Diretórios

```
cv-api/
├── drizzle/              # Schema e migrações do Drizzle
│   ├── migrations/       # Migrações SQL
│   ├── schema.ts         # Schema do banco de dados
│   └── seed.ts           # Script de seed
├── src/
│   ├── config/           # Configurações (DB client)
│   ├── controllers/      # Controladores HTTP
│   ├── middlewares/      # Middlewares (error handler)
│   ├── repositories/     # Camada de acesso a dados
│   ├── routes/           # Definição de rotas
│   ├── schemas/         # Schemas de validação Zod
│   ├── services/         # Lógica de negócios
│   ├── utils/           # Utilitários
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Ponto de entrada
├── docs/                # Documentação
├── package.json         # Dependências
└── tsconfig.json        # Configuração TypeScript
```

## Solução de Problemas

### Erro de Conexão com o Banco de Dados

1. Verifique se a `DATABASE_URL` está correta no arquivo `.env`
2. Verifique se o projeto Neon está ativo
3. Certifique-se de que a connection string inclui `?sslmode=require`

### Erro ao Aplicar Migrações

Se houver problemas com migrações:

```bash
# Verificar o status das migrações
npm run db:push

# Ou usar migrações versionadas
npm run db:migrate
```

### Porta Já em Uso

Se a porta 3000 estiver em uso, altere a variável `PORT` no arquivo `.env`.

### Erro de Autenticação no Neon

Certifique-se de que:
- A connection string está completa e correta
- O projeto Neon está ativo (não pausado)
- As credenciais estão atualizadas

## Próximos Passos

- Leia a [Documentação da API](./API.md) para entender todos os endpoints
- Importe a [Coleção Postman](./CV-API.postman_collection.json) para testar a API
- Consulte o [README.md](./README.md) para mais informações sobre a arquitetura
