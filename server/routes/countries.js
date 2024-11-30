import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// 获取所有国家列表
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT code, name_en as name, name_zh as nameZh 
      FROM countries 
      WHERE is_active = 1 
      ORDER BY CASE WHEN code = 'CN' THEN 0 ELSE 1 END, name_en
    `);
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
});

export default router; 