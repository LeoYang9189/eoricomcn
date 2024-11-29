const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // 默认错误响应
  const errorResponse = {
    success: false,
    message: '服务器内部错误',
    error: {
      message: err.message
    }
  };

  // 开发环境下添加更多错误信息
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.error.stack = err.stack;
  }

  res.status(err.status || 500).json(errorResponse);
};

module.exports = errorHandler; 