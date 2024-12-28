const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const promisePool = pool.promise();
const my_database = 'price_comparison_website';

async function createDatabase() {
  try {
    const [result] = await promisePool.query('CREATE DATABASE IF NOT EXISTS ??', [my_database]);
    console.log('数据库创建成功');
  } catch (error) {
    console.error('创建数据库失败:', error);
  }
}

async function createUserTable() {
    try {
      await promisePool.query('USE ??', [my_database]);
      
      const [result] = await promisePool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
        	password VARCHAR(255) NOT NULL,
					createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Users数据表创建成功');
    } catch (error) {
      console.error('创建数据表失败:', error);
    }
  }

async function setupDatabase() {
  await createDatabase();
  await createUserTable();
}

setupDatabase().then(() => {
  console.log('数据库和数据表创建完成');
}).catch((err) => {
  console.error('初始化失败:', err);
});

module.exports = promisePool;