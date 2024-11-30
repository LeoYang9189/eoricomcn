import pool from '../config/db.js';

// 使用 MySQL 查询
export async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
} 