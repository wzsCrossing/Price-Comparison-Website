const db = require('./db');
const my_database = 'price_comparison_website';

async function register(username, password, email) {
	try {
		await db.query('USE ??', [my_database]);
        await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
        return true;
	} catch (error) {
        console.error(error);
        return false;
	}
}

module.exports = {
	register,
};