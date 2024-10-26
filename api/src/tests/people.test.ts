import request from 'supertest';
import app from '../index';

describe('GET /people', () => {
  it('should return a list of characters', async () => {
    const response = await request(app).get('/people');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /people/:id', () => {
  it('should return a character by id', async () => {
    const response = await request(app).get('/people/671c47ea4e9b58a209f0adc0');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /people/:id', () => {
  it('should return person not found by id', async () => {
    const response = await request(app).get('/people/671c128a636d1afabce465f2');
    expect(response.status).toBe(404);
  });
});
