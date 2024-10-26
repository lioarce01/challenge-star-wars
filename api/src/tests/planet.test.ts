import request from 'supertest';
import app from '../index';

describe('GET /planets', () => {
  it('should return a list of planets', async () => {
    const response = await request(app).get('/planets');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /planets?offset=0&limit=5', () => {
  it('should return a list of planets with offset and limit', async () => {
    const response = await request(app).get('/planets?offset=0&limit=5');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(5);
  });
});

describe('GET /planets?climate=arid', () => {
  it('should return a list of planets with climate', async () => {
    const response = await request(app).get('/planets?climate=arid');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /planets?terrain=desert', () => {
  it('should return a list of planets with terrain', async () => {
    const response = await request(app).get('/planets?terrain=desert');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /planets?climate=arid&terrain=desert', () => {
  it('should return a list of planets with climate and terrain', async () => {
    const response = await request(app).get(
      '/planets?climate=arid&terrain=desert'
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /planets/:id', () => {
  it('should return a planet by id', async () => {
    const response = await request(app).get(
      '/planets/671c47e34e9b58a209f0ad84'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /planets/:id', () => {
  it('should return planet not found by id', async () => {
    const response = await request(app).get(
      '/planets/671c128a636d1afabce465f2'
    );
    expect(response.status).toBe(404);
  });
});
