import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countries.js';
import pool from './config/db.js';

const app = express();

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// CORS 配置
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com'
    : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// 解析 JSON
app.use(express.json());

// 路由
app.use('/api/countries', countriesRouter);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    valid: false,
    message: '未找到请求的资源'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

export default app; 