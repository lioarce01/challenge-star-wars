import request from 'supertest';
import app from '../index';

describe('GET /films', () => {
  it('should return a list of films', async () => {
    const response = await request(app).get('/films');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /films/:id', () => {
  it('should return a film by id', async () => {
    const response = await request(app).get('/films/671c47f94e9b58a209f0ae36');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /films/:id', () => {
  it('should return film not found by id', async () => {
    const response = await request(app).get('/films/671c128a636d1afabce465f2');
    expect(response.status).toBe(404);
  });
});
