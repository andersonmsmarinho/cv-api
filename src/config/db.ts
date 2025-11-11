import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../../drizzle/schema';

// Verificar se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida nas variáveis de ambiente');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

