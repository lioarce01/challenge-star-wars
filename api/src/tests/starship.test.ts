import request from 'supertest';
import app from '../index';

describe('GET /starships', () => {
  it('should return a list of starships', async () => {
    const response = await request(app).get('/starships');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /starships?offset=0&limit=5', () => {
  it('should return a list of starships with offset and limit', async () => {
    const response = await request(app).get('/starships?offset=0&limit=5');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(5);
  });
});

describe('GET /starships?starship_class=Star Destroyer', () => {
  it('should return a list of starships with starship class', async () => {
    const response = await request(app).get(
      '/starships?starship_class=Star Destroyer'
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /starships?manufacturer=Corellian Engineering Corporation', () => {
  it('should return a list of starships with manufacturer', async () => {
    const response = await request(app).get(
      '/starships?manufacturer=Corellian Engineering Corporation'
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('GET /starships?manufacturer=Corellian Engineering Corporation&starship_class=corvette', () => {
  it('should return a list of starships with manufacturer and starship class', async () => {
    const response = await request(app).get(
      '/starships?manufacturer=Corellian Engineering Corporation&starship_class=corvette'
    );
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
