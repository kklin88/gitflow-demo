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
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
  { id: 6, name: 'Frank' },
  { id: 7, name: 'Grace' },
  { id: 8, name: 'Hank' },
  { id: 9, name: 'Ivy' },
];

app.get('/users', (req, res) => {
  const { name } = req.query;
  if (name) {
    const result = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    return res.json(result);
  }
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 假資料 Orders
let orders = [
  { id: 1, userId: 1, product: 'Book', amount: 30 },
  { id: 2, userId: 2, product: 'Pen', amount: 5 },
];

// GET /orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// POST /orders
app.post('/orders', (req, res) => {
  const { userId, product, amount } = req.body;
  if (!userId || !product || typeof amount !== 'number' || amount <= 0)
    return res.status(400).json({ error: 'invalid payload' });
  const newOrder = { id: orders.length + 1, userId, product, amount };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// 讓程式可被測試
module.exports = app;
