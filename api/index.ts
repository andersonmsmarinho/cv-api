// Carregar variáveis de ambiente antes de importar o app
// (no Vercel, as variáveis são injetadas automaticamente, mas dotenv ajuda no desenvolvimento local)
// Carregar dotenv apenas se não estiver no Vercel
if (!process.env.VERCEL) {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Importar o app após carregar as variáveis de ambiente
import app from '../src/app';

// Exportar o app como handler do Vercel
export default app;

