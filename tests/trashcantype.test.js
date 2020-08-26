const supertest = require('supertest');
const db = require('../src/db');

const app = require('../src/app');

describe('GET all trashcan types', () => {
  it('should respond with an array', async () => {
    const response = await supertest(app)
      .get('/api/0.1/trashcanType/')
      .expect('Content-Type', /json/)
      .expect(200);
    // Test if array
    expect(response.body).toHaveProperty('length');
  });
});
