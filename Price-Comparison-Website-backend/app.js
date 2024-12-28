const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verify } = require('./login');
const { register } = require('./register');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  console.log('Login Request: ', req.body);
  const { username, password } = req.body;

  const result = await verify(username, password);
  if (result === 1) {
    res.json('登录成功');
  } else if (result === 0) {
    res.json('用户名或密码错误');
  } else {
    res.json('查询失败');
  }
});

app.post('/register', async (req, res) => {
  console.log('Register Request: ', req.body);
  const { username, password, email } = req.body;

  const result = await register(username, password, email);
  if (result) {
    res.json('注册成功');
  } else {
    res.json('注册失败');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});