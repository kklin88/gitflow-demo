// test/api.test.js
const request = require('supertest');
const app = require('../src/index');
const { expect } = require('chai');

describe('API 基礎測試', () => {
  it('GET /health 應回傳 UP', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'UP');
  });

  it('GET /users 應回傳預設使用者', async () => {
    const res = await request(app).get('/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.length(2);
  });

  it('POST /users 應建立新使用者', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Charlie' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', 'Charlie');
    expect(res.body).to.have.property('id');
  });
});
