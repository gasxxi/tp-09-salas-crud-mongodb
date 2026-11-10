# Trabajo práctico 09 - Operaciones CRUD sobre reservas de salas con MongoDB

## 1. Origen del proyecto y cambios respecto al TP 08
Para este trabajo tomé como base la aplicación desarrollada en el TP 08 (`tp-08-salas-http-mongodb`). En aquella entrega se conectó la persistencia de MongoDB Atlas a las vistas web y se crearon los endpoints básicos de lectura y alta (`GET` y `POST` sobre `/api/reservas`).
En esta entrega completé el ciclo CRUD sobre la colección en Atlas, incorporando sobre la ruta `/api/reservas/:id`:
* Reemplazo total mediante el método `PUT`.
* Modificación parcial de campos permitidos mediante el método `PATCH`.
* Eliminación física mediante el método `DELETE`.
* Se migró la base de datos a `reservas_salas_u9`, manteniendo la compatibilidad con las vistas web HTML tradicionales (`/reservas`, `/reservas/nueva`, `/reservas/:id`) y el endpoint `/estado`.

## 2. Tecnologías y versiones
* Node.js: v24.x (CommonJS)
* MongoDB Atlas: Clúster Free (M0)
* Mongoose: v8.x
* Express: v4.x
* EJS y express-ejs-layouts

## 3. Configuración del entorno
1. La base de datos asignada para esta unidad en MongoDB Atlas es `reservas_salas_u9` (colección `reservas`).
2. Se mantiene la configuración centralizada de DNS en `src/config/base-datos.js` con resolutores públicos (`8.8.8.8` y `1.1.1.1`) para garantizar la resolución de nombres SRV.
3. En el archivo local `.env` (excluido de Git mediante `.gitignore`):
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u9?retryWrites=true&w=majority