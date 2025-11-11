cv-api/
├── prisma/                 # Configuração do Prisma
│   ├── migrations/         # Migrações SQL geradas
│   ├── schema.prisma       # (Ver Seção 3)
│   └── seed.ts             # (Ver Seção 6)
├── src/
│   ├── config/             # Configuração (ex: prisma.ts)
│   ├── controllers/        # CAMADA WEB: Lida com HTTP (req, res)
│   ├── repositories/       # CAMADA DE DADOS: Lida com o Prisma
│   ├── services/           # CAMADA DE NEGÓCIOS: Lida com a lógica
│   ├── routes/             # Define os endpoints e conecta aos controllers
│   ├── middlewares/        # Middlewares (ex: errorHandler)
│   ├── utils/              # Funções utilitárias
│   ├── schemas/            # Schemas de validação Zod
│   ├── app.ts              # Configuração do App Express
│   └── server.ts           # Ponto de entrada (Inicializa o servidor)
├──.env                    # Variáveis de ambiente
├── package.json
└── tsconfig.json