import request from 'supertest';
import app from '../index';

describe('GET /people', () => {
  it('should return a list of characters', async () => {
    const response = await request(app).get('/people');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
  });
});

describe('GET /people?offset=0&limit=5', () => {
  it('should return a list of characters with offset and limit', async () => {
    const response = await request(app).get('/people?offset=0&limit=5');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');

    expect(response.body.results.length).toBe(5);
  });
});

describe('GET /people?gender=male', () => {
  it('should return a list of characters with gender', async () => {
    const response = await request(app).get('/people?gender=male');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
  });
});

describe('GET /people?homeworld=Tatooine', () => {
  it('should return a list of characters with homeworld', async () => {
    const response = await request(app).get('/people?homeworld=Tatooine');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
  });
});

describe('GET /people?hair_color=blond', () => {
  it('should return a list of characters with hair color', async () => {
    const response = await request(app).get('/people?hair_color=blond');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
  });
});

describe('GET /people?skin_color=fair', () => {
  it('should return a list of characters with skin color', async () => {
    const response = await request(app).get('/people?skin_color=fair');
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
  });
});

describe('GET /people?gender=male&homeworld=Tatooine&hair_color=blond&skin_color=fair', () => {
  it('should return a list of characters with gender, homeworld, hair color and skin color', async () => {
    const response = await request(app).get(
      '/people?gender=male&homeworld=Tatooine&hair_color=blond&skin_color=fair'
    );
    expect(response.status).toBe(200);

    expect(typeof response.body).toBe('object');

    expect(Array.isArray(response.body.results)).toBeTruthy();

    expect(typeof response.body.count).toBe('number');
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
