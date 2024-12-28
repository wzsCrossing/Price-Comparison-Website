const db = require('./db');
const my_database = 'price_comparison_website';

async function loginVerify(username, password) {
	try {
		await db.query('USE ??', [my_database]);
		const [result] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
		
		return result.length;
	} catch (error) {
		console.error('数据库查询失败:', error);
		return -1;
	}
}

module.exports = {
	loginVerify,
};