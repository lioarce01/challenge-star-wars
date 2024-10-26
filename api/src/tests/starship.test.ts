import request from 'supertest';
import app from '../index';

describe('GET /starships', () => {
  it('should return a list of starships', async () => {
    const response = await request(app).get('/starships');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /starships/:id', () => {
  it('should return a starship by id', async () => {
    const response = await request(app).get(
      '/starships/671c47f44e9b58a209f0ae12'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /starships/:id', () => {
  it('should return starship not found by id', async () => {
    const response = await request(app).get(
      '/starships/671c128a636d1afabce465f2'
    );
    expect(response.status).toBe(404);
  });
});
