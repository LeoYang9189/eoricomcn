#!/bin/bash

# 错误时退出
set -e

# 环境变量
DB_PASSWORD="Leo639189@"
JWT_SECRET="eori_jwt_secret_key_2024_03_19_secure_token_string"
ADMIN_PASSWORD="Admin_2024@eori"

echo "开始部署..."

# 前端构建
echo "构建前端..."
cd client
npm install
npm run build

# 后端部署
echo "部署后端..."
cd ../server
npm install

# 创建 .env 文件
echo "配置环境变量..."
cat > .env << EOF
NODE_ENV=production
PORT=3001
DB_HOST=192.168.0.40
DB_PORT=3306
DB_USER=root
DB_PASSWORD=$DB_PASSWORD
DB_NAME=eori
JWT_SECRET=$JWT_SECRET
ADMIN_EMAIL=gm@leotech.site
ADMIN_INITIAL_PASSWORD=$ADMIN_PASSWORD
EOF

# 使用 PM2 重启服务
echo "重启服务..."
pm2 restart eori-backend || pm2 start npm --name "eori-backend" -- start

echo "部署完成！"