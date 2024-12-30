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
        uid INT AUTO_INCREMENT PRIMARY KEY,
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

async function createCommodityTable() {
  try {
    await promisePool.query('USE ??', [my_database]);

    const [result] = await promisePool.query(`
      CREATE TABLE IF NOT EXISTS commodities (
        cid INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        platform VARCHAR(10) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        imgUrl VARCHAR(255) NOT NULL,
        link VARCHAR(5000) NOT NULL,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(title, platform)
      )
    `);
    console.log('Commodities数据表创建成功');
  } catch (error) {
    console.error('使用数据库失败:', error);
  }
}

async function createHistoryTable() {
  try {
    await promisePool.query('USE ??', [my_database]);

    const [result] = await promisePool.query(`
      CREATE TABLE IF NOT EXISTS price_history (
        cid INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cid) REFERENCES commodities(cid)
      )
    `);
    console.log('History数据表创建成功');
  } catch (error) {
    console.error('使用数据库失败:', error);
  }
}

async function createFollowTable() {
  try {
    await promisePool.query('USE ??', [my_database]);

    const [result] = await promisePool.query(`
      CREATE TABLE IF NOT EXISTS user_follow (
        username VARCHAR(255) NOT NULL,
        cid INT NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES users(username),
        FOREIGN KEY (cid) REFERENCES commodities(cid)
      )
    `);
    console.log('Follow数据表创建成功');
  } catch (error) {
    console.error('使用数据库失败:', error);
  }
}

async function setupDatabase() {
  await createDatabase();
  await createUserTable();
  await createCommodityTable();
  await createHistoryTable();
  await createFollowTable();
}

setupDatabase().then(() => {
  console.log('数据库和数据表创建完成');
}).catch((err) => {
  console.error('初始化失败:', err);
});

module.exports = promisePool;