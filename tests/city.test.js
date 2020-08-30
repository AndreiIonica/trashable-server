const supertest = require('supertest');
const db = require('../src/db');

const app = require('../src/app');

describe('GET all cities', () => {
  it('should respond with all the cities', async () => {
    const response = await supertest(app)
      .get('/api/0.1/city/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('length');
  });
});

describe('GET one city', () => {
  it('should respond with one city', async () => {
    const response = await supertest(app)
      .get('/api/0.1/city/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('county_id');
    expect(response.body).toHaveProperty('updated_at');
    expect(response.body).toHaveProperty('created_at');
  });
});
