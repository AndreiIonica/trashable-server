const supertest = require('supertest');
const db = require('../src/db');

const app = require('../src/app');

describe('GET all counties', () => {
  it('should get all counties', async () => {
    const response = await supertest(app)
      .get('/api/0.1/county/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).not.toBe(0);
  });
});
describe('GET one countie', () => {
  it('should  get one county', async () => {
    const response = await supertest(app)
      .get('/api/0.1/county/1')
      .expect('Content-Type', /json/)
      .expect(200);
    //un oras trb sa aiba proprietatile astea
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
    expect(response.body).toHaveProperty('code');
  });
});
