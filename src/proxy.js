const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

// Cấu hình proxy middleware
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:18893', // URL của máy chủ API của bạn
    changeOrigin: true,
  })
);

// Sử dụng port 3000 hoặc cổng bạn đang sử dụng cho ứng dụng React
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
