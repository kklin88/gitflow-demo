// src/index.js
const express = require('express');
const app = express();

// 中間件：解析 JSON body
app.use(express.json());

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// 假資料 Users
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 讓程式可被測試
module.exports = app;
