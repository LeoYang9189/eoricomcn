const rateLimit = require('express-rate-limit');
const axios = require('axios');

// 限制请求频率
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100次请求
});

// 重试机制
const retryRequest = async (url, data, headers, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await axios.post(url, data, {
        headers,
        timeout: 10000, // 10秒超时
        validateStatus: status => status < 500 // 只有5xx错误才重试
      });
    } catch (error) {
      console.error(`第${i + 1}次重试失败:`, {
        message: error.message,
        response: error.response?.data
      });

      if (i === maxRetries - 1) throw error;

      // 根据错误类型决定是否重试
      if (error.response && error.response.status < 500) {
        throw error; // 不重试客户端错误
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 指数退避
    }
  }
};

module.exports = {
  limiter,
  retryRequest
}; 