// test/orders.test.js
const request = require('supertest');
const app = require('../src/index');
const { expect } = require('chai');

describe('Orders API', () => {
  it('GET /orders should return list', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /orders should create order', async () => {
    const payload = { userId: 3, product: 'Notebook', amount: 12 };
    const res = await request(app).post('/orders').send(payload);
    expect(res.status).to.equal(201);
    expect(res.body).to.include(payload);
    expect(res.body).to.have.property('id');
  });
});
