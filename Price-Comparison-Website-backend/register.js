const db = require('./db');
const my_database = 'price_comparison_website';
const { sendEmail } = require('./email');

const emailCode = new Map();

async function registerConfirm(username, password, email, code) {
	if (!emailCode.has(email) || emailCode.get(email) !== code) {
		return 0;
	}

	try {
		await db.query('USE ??', [my_database]);
		await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
		emailCode.delete(email);
		return 1;
	} catch (error) {
		console.error(error);
		return -1;
	}
}

async function registerEmail(email) {
	const code = Math.random().toString(36).slice(-6);
	const subject = '邮箱绑定验证码';
	const content = `<center><h1>验证您是该电子邮件地址的所有者</h1></center>
		最近有人在验证时输入了该电子邮件地址。<br/>
    您可以使用此验证码来验证您是该电子邮件地址的所有者。<br/>
    <center><h2>您的验证码是：${code} </h2></center>
    如果这不是您本人所为，则可能是有人误输了您的电子邮件地址。请勿将此验证码泄露给他人，您目前无需执行任何其他操作。<br/>
    Price Hunter 团队敬上
	`;

	emailCode.set(email, code);
	await sendEmail(email, subject, content);
}

module.exports = {
	registerConfirm,
	registerEmail,
};