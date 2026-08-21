const express = require('express');
const os = require('os');

const app = express();

app.use(express.json());

// Ruta principal: pagina web Hola Mundo
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Hola Mundo DevOps</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
          }
          h1 { color: #38bdf8; font-size: 2.5rem; margin-bottom: 0.5rem; }
          p  { color: #94a3b8; margin: 0.3rem; }
          code { background: #1e293b; padding: 2px 8px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div>
          <h1>Hola Mundo desde Docker</h1>
          <p>Practica Final DevOps &mdash; CI/CD con GitHub Actions</p>
          <p>Jhostin Raposo Chala &middot; ITLA</p>
          <p>Contenedor: <code>${os.hostname()}</code></p>
        </div>
      </body>
    </html>
  `);
});

// Endpoint de salud, usado por Render y por monitoreo
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Endpoint de saludo con parametro, para probar logica en los tests
app.get('/api/saludo/:nombre', (req, res) => {
  const { nombre } = req.params;
  res.status(200).json({ mensaje: `Hola, ${nombre}!` });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
