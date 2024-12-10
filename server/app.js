import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countries.js';
import pool from './config/db.js';

const app = express();

// 添加详细的启动日志
console.log('Starting server with configuration:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

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

// 添加健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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
  console.error('Error:', err);
  res.status(500).json({ message: 'Something broke!' });
});

export default app; 