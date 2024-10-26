import request from 'supertest';
import app from '../index';

describe('GET /films', () => {
  it('should return a list of films', async () => {
    const response = await request(app).get('/films');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /films?offset=0&limit=5', () => {
  it('should return a list of films with offset and limit', async () => {
    const response = await request(app).get('/films?offset=0&limit=5');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(5);
  });
});

describe('GET /films?director=George Lucas', () => {
  it('should return a list of films with director', async () => {
    const response = await request(app).get('/films?director=George Lucas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /films?producer=Gary Kurtz', () => {
  it('should return a list of films with producer', async () => {
    const response = await request(app).get('/films?producer=Gary Kurtz');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /films?director=George Lucas&producer=Gary Kurtz', () => {
  it('should return a list of films with director and producer', async () => {
    const response = await request(app).get(
      '/films?director=George Lucas&producer=Gary Kurtz'
    );
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
