// Tests for the app
// TODO: Dragos + set-up test db
const supertest = require('supertest');
const db = require('../src/db');

const app = require('../src/app');

// TODO: modify this test to a better one
describe('GET /', function () {
  it('should respond with a message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('Trashable Backend!');
  });
});
