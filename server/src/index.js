import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 基本的健康检查路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 申请提交路由
app.post('/api/applications', (req, res) => {
  try {
    // 这里只是模拟，实际需要保存到数据库
    const applicationId = 'APP' + Date.now();
    res.json({
      success: true,
      applicationId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '提交失败'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 