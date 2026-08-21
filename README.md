# Practica Final DevOps - CI/CD con GitHub Actions

Aplicacion web "Hola Mundo" en Node.js + Express que implementa un ciclo
completo de integracion y entrega continua.

**Autor:** Jhostin Raposo Chala
**Institucion:** ITLA

## Enlaces

- **Repositorio:** https://github.com/jhostin28/devops-final-cicd
- **Aplicacion en produccion:** (URL de Render)
- **Imagen en Docker Hub:** https://hub.docker.com/r/jhostin28/devops-final-cicd

## Stack

| Componente | Tecnologia |
|---|---|
| Aplicacion | Node.js 20 + Express |
| Pruebas unitarias | Jest + Supertest |
| Contenedores | Docker (build multi-etapa) |
| Registro de imagenes | Docker Hub |
| CI/CD | GitHub Actions |
| Produccion | Render |

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/` | Pagina web Hola Mundo |
| GET | `/health` | Estado del servicio y uptime |
| GET | `/api/saludo/:nombre` | Saludo personalizado en JSON |

## Pipeline

El workflow `.github/workflows/ci-cd.yml` se ejecuta en cada push a `main`
y encadena tres etapas:

1. **test** - instala dependencias con `npm ci` y ejecuta las pruebas
   unitarias. Si alguna falla, el pipeline se detiene aqui y no se publica
   nada. Funciona como quality gate.
2. **build-and-push** - construye la imagen Docker y la publica en Docker Hub
   con dos etiquetas: `latest` y el SHA del commit, para trazabilidad.
3. **deploy** - dispara el despliegue automatico en Render mediante su API.

Los pull requests ejecutan unicamente la etapa de pruebas.

## Ejecutar localmente

```bash
npm install
npm test          # ejecutar pruebas unitarias
npm start         # servidor en http://localhost:3000
```

## Ejecutar con Docker

```bash
docker build -t devops-final-cicd .
docker run -p 8080:3000 devops-final-cicd
```

O directamente desde Docker Hub:

```bash
docker run -p 8080:3000 jhostin28/devops-final-cicd:latest
```

## Secrets requeridos

Configurados en Settings > Secrets and variables > Actions:

| Secret | Descripcion |
|---|---|
| `DOCKERHUB_USERNAME` | Usuario de Docker Hub |
| `DOCKERHUB_TOKEN` | Personal access token con permiso Read & Write |
| `RENDER_API_KEY` | API key de la cuenta de Render |
| `RENDER_SERVICE_ID` | ID del servicio, formato `srv-...` |
