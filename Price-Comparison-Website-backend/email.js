const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function sendEmail(email, subject, content) {
  const info = await transporter.sendMail({
		from: '"Price Hunter 👻" <1076547517@qq.com>',
		to: email,
		subject: subject,
		html: content,
  });

  console.log("已发送消息: %s", info.messageId);
}

module.exports = {
  sendEmail,
};