const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loginVerify } = require('./login');
const { registerConfirm, registerEmail } = require('./register');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  console.log('Login Request: ', req.body);
  const { username, password } = req.body;

  const result = await loginVerify(username, password);
  if (result === 1) {
    res.json('登录成功');
  } else if (result === 0) {
    res.json('用户名或密码错误');
  } else {
    res.json('查询失败');
  }
});

app.post('/register/confirm', async (req, res) => {
  console.log('Register Request: ', req.body);
  const { username, password, email, code } = req.body;

  const result = await registerConfirm(username, password, email, code);
  if (result == 1) {
    res.json('注册成功');
  } else if (result == 0) {
    res.json('验证码错误');
  } else {
    res.json('注册失败');
  }
});

app.post('/register/email', async (req, res) => {
  console.log('Email Request: ', req.body);
  const { email } = req.body;

  await registerEmail(email);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});