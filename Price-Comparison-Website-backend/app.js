const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loginVerify } = require('./login');
const { registerConfirm, registerEmail } = require('./register');
const { commodityCrawl, commodityFollow, commodityUnfollow, commodityHistory } = require('./commodity');
const { userFollowed } = require('./user');
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

app.post('/commodity/crawler', async (req, res) => {
  console.log('Crawler Request: ', req.body);
  const { username, keyword, platforms } = req.body;

  const products = await commodityCrawl(username, keyword, platforms);
  res.json(products);
});

app.post('/commodity/follow', async (req, res) => {
  console.log('Follow Request: ', req.body);
  const { username, cid } = req.body;

  await commodityFollow(username, cid);
});

app.post('/commodity/unfollow', async (req, res) => {
  console.log('Unfollow Request: ', req.body);
  const { username, cid } = req.body;

  await commodityUnfollow(username, cid);
});

app.post('/commodity/history', async (req, res) => {
  console.log('History Request: ', req.body);
  const { cid } = req.body;

  const result = await commodityHistory(cid);
  res.json(result);
});

app.post('/user/followed', async (req, res) => {
  console.log('Followed Request: ', req.body);
  const { username } = req.body;

  const result = await userFollowed(username);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});