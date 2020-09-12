// Tests for the app

const supertest = require('supertest');
const db = require('../src/db');

const app = require('../src/app');

describe('GET /', () => {
  it('should respond with a message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('Trashable Backend!');
  });
});

describe('GET /api/0.1/', () => {
  it('should respond with message', async () => {
    const response = await supertest(app)
      .get('/api/0.1/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.message).toEqual('API');
  });
});
