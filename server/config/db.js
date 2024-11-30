import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,        // 阿里云RDS连接地址
  port: process.env.DB_PORT || 3306,// 数据库端口
  user: process.env.DB_USER,        // 数据库用户名
  password: process.env.DB_PASSWORD,// 数据库密码
  database: process.env.DB_NAME,    // 数据库名
  waitForConnections: true,
  connectionLimit: 10,              // 连接池最大连接数
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: {
    rejectUnauthorized: false // 开发环境可以设置为false
  }
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 测试连接
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

pool.on('error', (err) => {
  console.error('Unexpected error on idle connection:', err);
  process.exit(-1);
});

export default pool; 