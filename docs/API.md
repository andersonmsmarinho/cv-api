# Documentação da API - CV-API v1

## Introdução

Esta documentação descreve todos os endpoints da CV-API, uma API RESTful para gerenciamento de currículos e perfis profissionais.

- **URL Base:** `http://localhost:3000/api/v1`
- **Formato de Resposta:** JSON
- **Autenticação:** Não requerida (para esta versão)

## Padrões de Resposta

### Códigos de Status HTTP

#### Sucesso
- `200 OK`: Requisição bem-sucedida (GET, PUT)
- `201 Created`: Recurso criado com sucesso (POST)
- `204 No Content`: Requisição bem-sucedida, sem corpo de resposta (DELETE)

#### Erro
- `400 Bad Request`: Requisição malformada ou erro de validação
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito (ex: email duplicado)
- `500 Internal Server Error`: Erro inesperado no servidor

### Formato de Erro

```json
{
  "message": "Descrição do erro",
  "errors": [] // Apenas em erros de validação
}
```

---

## Endpoints

### Health Check

#### GET /health

Verifica o status da aplicação.

**Resposta (200 OK):**
```json
{
  "status": "OK"
}
```

---

## Profiles (Perfis)

### GET /api/v1/profiles

Lista todos os perfis cadastrados (versão simplificada).

**Resposta (200 OK):**
```json
[
  {
    "id": "uuid-ana-silva",
    "email": "ana.silva@email.com",
    "name": "Ana Silva",
    "headline": "Desenvolvedora Frontend Sênior",
    "skills": [
      { "id": "uuid-react", "name": "react" }
    ]
  }
]
```

### POST /api/v1/profiles

Cria um novo perfil.

**Corpo da Requisição:**
```json
{
  "email": "carlos.dias@email.com",
  "name": "Carlos Dias",
  "headline": "Engenheiro de DevOps",
  "bio": "Profissional focado em automação e CI/CD."
}
```

**Resposta (201 Created):**
```json
{
  "id": "uuid-carlos-dias",
  "email": "carlos.dias@email.com",
  "name": "Carlos Dias",
  "headline": "Engenheiro de DevOps",
  "bio": "Profissional focado em automação e CI/CD.",
  "createdAt": "2024-10-27T10:00:00.000Z",
  "updatedAt": "2024-10-27T10:00:00.000Z"
}
```

### GET /api/v1/profiles/:id

Obtém um perfil completo, incluindo todas as suas relações.

**Parâmetros:**
- `id` (string, UUID): O ID do perfil

**Resposta (200 OK):**
```json
{
  "id": "uuid-ana-silva",
  "email": "ana.silva@email.com",
  "name": "Ana Silva",
  "headline": "Desenvolvedora Frontend Sênior",
  "bio": "...",
  "socialLinks": [
    { "id": "uuid-social", "platform": "LinkedIn", "url": "..." }
  ],
  "experiences": [
    { "id": "uuid-exp", "title": "...", "company": "..." }
  ],
  "education": [
    { "id": "uuid-edu", "institution": "Universidade X", "degree": "..." }
  ],
  "projects": [
    { "id": "uuid-proj", "name": "...", "description": "..." }
  ],
  "skills": [
    { "id": "uuid-react", "name": "react" }
  ]
}
```

### PUT /api/v1/profiles/:id

Atualiza os dados básicos de um perfil.

**Parâmetros:**
- `id` (string, UUID): O ID do perfil

**Corpo da Requisição (campos opcionais):**
```json
{
  "headline": "Especialista em React e Next.js",
  "bio": "Novo bio atualizado."
}
```

**Resposta (200 OK):** O perfil completo atualizado

### DELETE /api/v1/profiles/:id

Deleta um perfil e todos os seus relacionamentos (cascata).

**Parâmetros:**
- `id` (string, UUID): O ID do perfil

**Resposta (204 No Content):** Sem corpo de resposta

### POST /api/v1/profiles/:profileId/skills/:skillId

Associa uma habilidade a um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil
- `skillId` (string, UUID): O ID da habilidade

**Resposta (200 OK):** O perfil atualizado com as habilidades

### DELETE /api/v1/profiles/:profileId/skills/:skillId

Desassocia uma habilidade de um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil
- `skillId` (string, UUID): O ID da habilidade

**Resposta (200 OK):** O perfil atualizado com as habilidades

---

## Skills (Habilidades)

### GET /api/v1/skills

Lista todas as habilidades disponíveis na plataforma (taxonomia).

**Resposta (200 OK):**
```json
[
  { "id": "uuid-react", "name": "react", "createdAt": "..." },
  { "id": "uuid-nodejs", "name": "node.js", "createdAt": "..." }
]
```

### POST /api/v1/skills

Cria uma nova habilidade na taxonomia. Se já existir (pelo nome), retorna a existente.

**Corpo da Requisição:**
```json
{
  "name": "TypeScript"
}
```

**Resposta (201 Created ou 200 OK):**
```json
{
  "id": "uuid-typescript",
  "name": "typescript",
  "createdAt": "2024-10-27T10:00:00.000Z"
}
```

---

## Experiences (Experiências)

### POST /api/v1/experiences/profile/:profileId

Adiciona uma nova experiência a um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil

**Corpo da Requisição:**
```json
{
  "title": "Engenheiro de Software Pleno",
  "company": "Startup Y",
  "location": "São Paulo, SP",
  "startDate": "2022-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "description": "Desenvolvimento de features com React."
}
```

**Nota:** `endDate` pode ser `null` para empregos atuais.

**Resposta (201 Created):**
```json
{
  "id": "uuid-exp-nova",
  "title": "Engenheiro de Software Pleno",
  "company": "Startup Y",
  "profileId": "uuid-ana-silva",
  "startDate": "2022-01-01T00:00:00.000Z",
  "endDate": "2023-12-31T00:00:00.000Z",
  "createdAt": "2024-10-27T10:00:00.000Z",
  "updatedAt": "2024-10-27T10:00:00.000Z"
}
```

### PUT /api/v1/experiences/:id

Atualiza uma experiência específica.

**Parâmetros:**
- `id` (string, UUID): O ID da experiência

**Corpo da Requisição (campos opcionais):**
```json
{
  "endDate": "2023-12-31T00:00:00.000Z",
  "description": "Descrição atualizada."
}
```

**Resposta (200 OK):** A experiência atualizada

### DELETE /api/v1/experiences/:id

Remove uma experiência específica.

**Parâmetros:**
- `id` (string, UUID): O ID da experiência

**Resposta (204 No Content):** Sem corpo de resposta

---

## Education (Formação)

### POST /api/v1/education/profile/:profileId

Adiciona uma nova formação a um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil

**Corpo da Requisição:**
```json
{
  "institution": "Universidade X",
  "degree": "Bacharelado em Ciência da Computação",
  "fieldOfStudy": "Ciência da Computação",
  "startDate": "2015-01-01T00:00:00.000Z",
  "endDate": "2019-12-31T00:00:00.000Z",
  "description": "Formação completa em ciência da computação."
}
```

**Resposta (201 Created):** A formação criada

### PUT /api/v1/education/:id

Atualiza uma formação específica.

**Parâmetros:**
- `id` (string, UUID): O ID da formação

**Corpo da Requisição (campos opcionais):**
```json
{
  "degree": "Mestrado em Ciência da Computação",
  "endDate": "2021-12-31T00:00:00.000Z"
}
```

**Resposta (200 OK):** A formação atualizada

### DELETE /api/v1/education/:id

Remove uma formação específica.

**Parâmetros:**
- `id` (string, UUID): O ID da formação

**Resposta (204 No Content):** Sem corpo de resposta

---

## Projects (Projetos)

### POST /api/v1/projects/profile/:profileId

Adiciona um novo projeto a um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil

**Corpo da Requisição:**
```json
{
  "name": "E-commerce Platform",
  "description": "Plataforma completa de e-commerce desenvolvida em React.",
  "url": "https://ecommerce-example.com",
  "repositoryUrl": "https://github.com/user/ecommerce"
}
```

**Resposta (201 Created):** O projeto criado

### PUT /api/v1/projects/:id

Atualiza um projeto específico.

**Parâmetros:**
- `id` (string, UUID): O ID do projeto

**Corpo da Requisição (campos opcionais):**
```json
{
  "description": "Descrição atualizada do projeto.",
  "url": "https://new-url.com"
}
```

**Resposta (200 OK):** O projeto atualizado

### DELETE /api/v1/projects/:id

Remove um projeto específico.

**Parâmetros:**
- `id` (string, UUID): O ID do projeto

**Resposta (204 No Content):** Sem corpo de resposta

---

## Social Links (Links Sociais)

### POST /api/v1/socialLinks/profile/:profileId

Adiciona um novo link social a um perfil.

**Parâmetros:**
- `profileId` (string, UUID): O ID do perfil

**Corpo da Requisição:**
```json
{
  "platform": "LinkedIn",
  "url": "https://linkedin.com/in/user"
}
```

**Resposta (201 Created):** O link social criado

### PUT /api/v1/socialLinks/:id

Atualiza um link social específico.

**Parâmetros:**
- `id` (string, UUID): O ID do link social

**Corpo da Requisição (campos opcionais):**
```json
{
  "url": "https://linkedin.com/in/new-profile"
}
```

**Resposta (200 OK):** O link social atualizado

### DELETE /api/v1/socialLinks/:id

Remove um link social específico.

**Parâmetros:**
- `id` (string, UUID): O ID do link social

**Resposta (204 No Content):** Sem corpo de resposta

---

## Validações

Todos os endpoints validam os dados de entrada usando Zod. Erros de validação retornam:

**Status:** `400 Bad Request`

**Corpo:**
```json
{
  "message": "Erro de validação",
  "errors": [
    {
      "path": ["body", "email"],
      "message": "Email inválido"
    }
  ]
}
```

### Regras de Validação

- **Email:** Deve ser um email válido
- **UUID:** IDs devem ser UUIDs válidos
- **Datas:** Devem estar no formato ISO 8601 (datetime)
- **URLs:** Devem ser URLs válidas
- **Campos obrigatórios:** Não podem ser vazios ou nulos

---

## Exemplos de Uso

### Criar um Perfil Completo

1. Criar o perfil:
```bash
POST /api/v1/profiles
{
  "email": "joao@email.com",
  "name": "João Silva",
  "headline": "Desenvolvedor Full Stack"
}
```

2. Adicionar habilidades:
```bash
POST /api/v1/profiles/{profileId}/skills/{skillId}
```

3. Adicionar experiências:
```bash
POST /api/v1/experiences/profile/{profileId}
{
  "title": "Desenvolvedor",
  "company": "Empresa X",
  "startDate": "2020-01-01T00:00:00.000Z"
}
```

4. Adicionar formação, projetos e links sociais de forma similar.

---

## Limitações

- Não há paginação nos endpoints de listagem
- Não há autenticação/autorização implementada
- Não há rate limiting
- Não há versionamento além da v1

---

## Suporte

Para mais informações, consulte:
- [Guia de Instalação](./INSTALLATION.md)
- [README](./README.md)