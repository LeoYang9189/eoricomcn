import mysql from 'mysql2/promise';
import { Pool } from '@neondatabase/serverless';

const isDev = process.env.NODE_ENV !== 'production';

let pool;

if (isDev) {
  // 本地开发环境使用 MySQL
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else {
  // 生产环境使用 Neon Serverless
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

export default pool; 