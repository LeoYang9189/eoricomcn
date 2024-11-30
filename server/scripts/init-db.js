import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载 .env 文件
dotenv.config({ path: path.join(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const COUNTRIES = [
  { code: 'CN', name: 'China', nameZh: '中国' },
  { code: 'US', name: 'United States', nameZh: '美国' },
  { code: 'GB', name: 'United Kingdom', nameZh: '英国' },
  { code: 'JP', name: 'Japan', nameZh: '日本' },
  { code: 'DE', name: 'Germany', nameZh: '德国' },
  { code: 'FR', name: 'France', nameZh: '法国' },
  { code: 'IT', name: 'Italy', nameZh: '意大利' },
  { code: 'CA', name: 'Canada', nameZh: '加拿大' },
  { code: 'AU', name: 'Australia', nameZh: '澳大利亚' },
  { code: 'KR', name: 'South Korea', nameZh: '韩国' }
];

async function initDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // 创建用户表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        role ENUM('user', 'admin') DEFAULT 'user',
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // 创建国家表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS countries (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(2) NOT NULL UNIQUE,
        name_en VARCHAR(100) NOT NULL,
        name_zh VARCHAR(100) NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // 插入国家数据
    for (const country of COUNTRIES) {
      await connection.execute(`
        INSERT INTO countries (code, name_en, name_zh)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        name_en = VALUES(name_en),
        name_zh = VALUES(name_zh)
      `, [country.code, country.name, country.nameZh]);
    }

    // 创建一个默认管理员账号
    const adminPassword = 'admin123'; // 在实际应用中应该使用加密的密码
    await connection.execute(`
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      password = VALUES(password)
    `, ['admin@example.com', adminPassword, 'Admin', 'admin']);

    console.log('Database initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();