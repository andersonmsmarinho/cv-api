// Carregar variáveis de ambiente antes de importar o app
// (no Vercel, as variáveis são injetadas automaticamente, mas dotenv ajuda no desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Importar o app após carregar as variáveis de ambiente
import app from '../src/app';

// Exportar o app como handler do Vercel
export default app;

