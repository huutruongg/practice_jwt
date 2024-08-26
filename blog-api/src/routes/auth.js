const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Secret key cho JWT (nên lưu trữ bí mật)
const JWT_SECRET = 'YOUR_JWT_SECRET';

// Giả lập lấy dữ liệu từ json-server
const users = require('../db.json').users;

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
  }
});

module.exports = router;