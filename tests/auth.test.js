const request = require('supertest');
const app = require('../server'); // Vous devrez exporter l'app depuis server.js
const { initializeDatabase } = require('../config/database');

describe('Auth Routes', () => {
  let db;

  beforeAll(async () => {
    db = initializeDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('POST /login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });
      expect(res.statusCode).toBe(200);
    });

    it('should fail with invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          username: 'wronguser',
          password: 'wrongpassword'
        });
      expect(res.statusCode).toBe(401);
    });
  });
});
