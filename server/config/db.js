import { Pool } from '@neondatabase/serverless';

const isDev = process.env.NODE_ENV !== 'production';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool; 