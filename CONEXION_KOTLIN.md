# 🎵 Guía de Conexión: Backend NestJS ↔️ App Kotlin

## ✅ Configuración Completada

He actualizado tu aplicación de Kotlin para que se conecte correctamente con el backend de NestJS.

---

## 📱 Cambios Realizados en la App de Kotlin

### 1. **ApiConfig.kt** - Configuración de URL
- ✅ Agregué comentarios explicando las 3 opciones de conexión
- Por defecto usa: `http://10.0.2.2:3000/` (para emulador Android)

### 2. **ApiService.kt** - Endpoints actualizados
- ✅ Sincronizado con los endpoints reales del backend NestJS
- ✅ Agregados todos los endpoints de shows, auth y applications
- ✅ Actualizado para recibir `List<Show>` en lugar de `ShowsResponse`

### 3. **Show.kt** - Modelo actualizado
- ✅ Campos sincronizados con la entidad de NestJS
- ✅ Agregado campo `promoter` con relación al usuario
- ✅ Todos los campos opcionales marcados correctamente

### 4. **ShowRequests.kt** - DTOs creados
- ✅ Nuevos DTOs: `CreateShowRequest`, `UpdateShowRequest`, `MessageResponse`
- ✅ Listos para crear y actualizar shows

### 5. **ShowsRepository.kt** - Repositorio actualizado
- ✅ Maneja `List<Show>` directamente (sin wrapper)
- ✅ Agregados filtros de fecha: `dateFrom` y `dateTo`

### 6. **ShowsViewModel.kt** - ViewModel actualizado
- ✅ Actualizado para manejar la nueva estructura de datos
- ✅ Agregados filtros de fecha en `loadShows()`

---

## 🚀 Cómo Probar la Conexión

### Opción 1: Backend Local + Emulador Android (RECOMENDADO para desarrollo)

1. **Inicia el backend en tu PC:**
   ```bash
   cd C:\Users\GIGABYTE\Documents\Universidad\vibe-stage-backend\backend
   npm run start:dev
   ```
   - El servidor debe estar corriendo en `http://localhost:3000`

2. **En ApiConfig.kt, usa esta URL:**
   ```kotlin
   const val BASE_URL = "http://10.0.2.2:3000/"
   ```
   - `10.0.2.2` es la IP especial que el emulador de Android usa para acceder a localhost de tu PC

3. **Ejecuta la app de Kotlin desde Android Studio**
   - El emulador podrá conectarse a tu backend local

### Opción 2: Backend Local + Dispositivo Físico

1. **Obtén tu IP local:**
   ```cmd
   ipconfig
   ```
   - Busca tu IPv4 (ejemplo: `192.168.1.100`)
   - Tu PC y tu teléfono deben estar en la misma red WiFi

2. **Actualiza el backend para aceptar conexiones externas:**
   En `src/main.ts`, cambia:
   ```typescript
   await app.listen(3000);
   ```
   Por:
   ```typescript
   await app.listen(3000, '0.0.0.0');
   ```

3. **En ApiConfig.kt, usa tu IP local:**
   ```kotlin
   const val BASE_URL = "http://192.168.1.100:3000/"
   ```

4. **Reinicia el backend y ejecuta la app**

### Opción 3: Backend Desplegado en Railway (PRODUCCIÓN)

1. **Despliega el backend en Railway:**
   - Ve a [Railway](https://railway.app)
   - Conecta tu repositorio de GitHub con el backend
   - Railway detectará automáticamente que es un proyecto Node.js
   - Obtén la URL pública (ejemplo: `https://vibe-stage-backend-production.up.railway.app`)

2. **Actualiza ApiConfig.kt:**
   ```kotlin
   const val BASE_URL = "https://tu-backend.up.railway.app/"
   ```

3. **Configura las variables de entorno en Railway:**
   - `DB_HOST`: metro.proxy.rlwy.net
   - `DB_PORT`: 49971
   - `DB_USERNAME`: root
   - `DB_PASSWORD`: GWHYikDzXPHTyaDPqHICVTJybabRqyir
   - `DB_DATABASE`: railway
   - `JWT_SECRET`: clave_super_secreta

---

## 🧪 Probar los Endpoints

### 1. Registro de Usuario
```kotlin
// En tu AuthRepository/ViewModel
val registerRequest = RegisterRequest(
    name = "Juan Artista",
    email = "juan@example.com",
    password = "123456",
    role = "artist"
)
```

### 2. Login
```kotlin
val loginRequest = LoginRequest(
    email = "juan@example.com",
    password = "123456"
)
// Guardará el token automáticamente con TokenManager
```

### 3. Obtener Shows
```kotlin
// En tu ShowsViewModel
loadShows(
    genre = "Rock",
    location = "Lima",
    dateFrom = "2025-03-01",
    dateTo = "2025-03-31"
)
```

---

## 🔐 Autenticación

El sistema ya está configurado con interceptores:
- ✅ `AuthInterceptor` agrega automáticamente el token JWT a las peticiones
- ✅ `TokenManager` guarda y recupera el token de SharedPreferences
- ✅ Endpoints protegidos: `POST /shows`, `PUT /shows/:id`, `DELETE /shows/:id`, todas las rutas de `/applications`

---

## 📊 Estado Actual de la Base de Datos

Tu backend está conectado a Railway MySQL:
- **Host**: metro.proxy.rlwy.net:49971
- **Base de datos**: railway
- Las tablas se crean automáticamente (TypeORM con `synchronize: true`)

### Tablas creadas:
- ✅ `user` - Usuarios (artistas y promotores)
- ✅ `show` - Shows/presentaciones
- ✅ `event` - Eventos (si usas el EventsModule)
- ✅ `application` - Postulaciones de artistas (en memoria por ahora)

---

## 🐛 Solución de Problemas

### Error: "Unable to connect to the database"
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que Railway permita conexiones externas

### Error: "java.net.ConnectException: Failed to connect"
- Si usas emulador: verifica que uses `10.0.2.2` en lugar de `localhost`
- Si usas dispositivo físico: verifica que estén en la misma red WiFi
- Verifica que el backend esté corriendo (debe mostrar "Nest application successfully started")

### Error: "401 Unauthorized"
- El token JWT puede haber expirado
- Vuelve a hacer login para obtener un nuevo token
- Verifica que el interceptor esté agregando el header `Authorization: Bearer <token>`

### Shows vacíos
- La base de datos está nueva, no hay shows creados aún
- Debes crear shows primero desde un usuario con rol `promoter`

---

## 📝 Próximos Pasos

1. **Crear un promotor de prueba:**
   ```bash
   POST http://localhost:3000/auth/register
   {
     "name": "Promotor Test",
     "email": "promotor@test.com",
     "password": "123456",
     "role": "promoter"
   }
   ```

2. **Crear algunos shows de prueba** usando el token del promotor

3. **Registrar un artista** y hacer login desde la app de Kotlin

4. **Probar la funcionalidad de postulaciones** (Applications)

---

## 🎯 Arquitectura de la Integración

```
┌─────────────────────────────────────┐
│  App Kotlin (Android)               │
│  - Retrofit + OkHttp                │
│  - Moshi (JSON)                     │
│  - Coroutines + Flow                │
│  - MVVM Architecture                │
└─────────────┬───────────────────────┘
              │ HTTP/REST
              │ JSON
              ↓
┌─────────────────────────────────────┐
│  Backend NestJS (Node.js)           │
│  - Controllers                      │
│  - Services                         │
│  - JWT Auth + Guards                │
│  - TypeORM                          │
└─────────────┬───────────────────────┘
              │ MySQL Protocol
              ↓
┌─────────────────────────────────────┐
│  Railway MySQL Database             │
│  - Users, Shows, Events, Apps       │
└─────────────────────────────────────┘
```

---

✨ **¡Todo listo para conectar tu app de Kotlin con el backend!**

