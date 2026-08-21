const request = require('supertest');
const app = require('./app');

describe('Aplicacion Hola Mundo', () => {

  test('GET / responde 200 y muestra el saludo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hola Mundo desde Docker');
  });

  test('GET / devuelve contenido HTML', async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('GET /health responde 200 con estado ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /health incluye el tiempo de actividad', async () => {
    const res = await request(app).get('/health');
    expect(typeof res.body.uptime).toBe('number');
  });

  test('GET /api/saludo/:nombre devuelve el saludo personalizado', async () => {
    const res = await request(app).get('/api/saludo/Jhostin');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Hola, Jhostin!');
  });

  test('Una ruta inexistente responde 404', async () => {
    const res = await request(app).get('/ruta-que-no-existe');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Ruta no encontrada');
  });

});
