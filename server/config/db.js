import mysql from 'mysql2/promise';
import { Pool } from '@neondatabase/serverless';
import { parse } from 'url';

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
  const { hostname, username, password, pathname } = parse(process.env.DATABASE_URL);
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
}

// 测试连接
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

testConnection();

export default pool; 