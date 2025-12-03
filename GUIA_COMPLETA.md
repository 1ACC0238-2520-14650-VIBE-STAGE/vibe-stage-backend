# 🎵 Guía Completa de Integración - VibeStage

## 📊 Arquitectura del Sistema

```
┌─────────────────────────────────────┐
│  App Kotlin (Android)               │
│  ROL: ARTISTAS                      │
│  - Buscar shows/oportunidades       │
│  - Postularse a eventos             │
│  - Ver estado de postulaciones      │
└─────────────┬───────────────────────┘
              │
              │ HTTP/REST + JWT
              │
┌─────────────▼───────────────────────┐
│  Backend NestJS (Node.js)           │
│  - API REST unificada               │
│  - Autenticación JWT                │
│  - TypeORM + MySQL                  │
└─────────────┬───────────────────────┘
              │
              │ HTTP/REST + JWT
              │
┌─────────────▼───────────────────────┐
│  App Flutter (iOS/Android)          │
│  ROL: PROMOTORES                    │
│  - Crear shows/eventos              │
│  - Gestionar postulaciones          │
│  - Aceptar/rechazar artistas        │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Railway MySQL Database             │
│  - users (artistas y promotores)    │
│  - shows (oportunidades)            │
│  - events (eventos)                 │
│  - applications (postulaciones)     │
└─────────────────────────────────────┘
```

---

## ✅ Cambios Realizados

### 🎯 Backend NestJS

#### 1. **Base de Datos Railway MySQL Configurada**
- ✅ Credenciales actualizadas en `.env`
- ✅ Conectado a Railway: `metro.proxy.rlwy.net:49971`
- ✅ Base de datos: `railway`

#### 2. **Script de Seed Creado** (`src/database/seed.ts`)
- ✅ Crea 3 promotores de prueba
- ✅ Crea 2 artistas de prueba
- ✅ Crea 10 shows/oportunidades diversos (Rock, Jazz, Indie, Pop, etc.)
- ✅ Crea 2 eventos adicionales
- ✅ Password para todos: `123456`

#### 3. **Nuevo Script NPM**
```bash
npm run seed  # Poblar la base de datos con datos de prueba
```

---

### 📱 App Kotlin (Artistas)

#### Archivos Actualizados:

1. **ApiConfig.kt** - URL del backend configurada
2. **ApiService.kt** - Endpoints sincronizados con NestJS
3. **Show.kt** - Modelo actualizado con campos del backend
4. **ShowRequests.kt** (nuevo) - DTOs para crear/actualizar shows
5. **ShowsRepository.kt** - Maneja `List<Show>` directamente
6. **ShowsViewModel.kt** - Lógica actualizada para nueva estructura

#### Estado:
- ✅ **LISTO PARA USAR** - Solo necesita que el backend esté corriendo
- ✅ Configurado para emulador: `http://10.0.2.2:3000/`

---

### 📱 App Flutter (Promotores)

#### Archivos Creados/Actualizados:

1. **`lib/core/config/api_config.dart`** (nuevo)
   - Configuración de URL base
   - Endpoints centralizados
   - Timeouts configurados

2. **`lib/core/services/api_service.dart`** (nuevo)
   - Métodos para auth: `register()`, `login()`
   - Métodos para shows: `getShows()`, `createShow()`, `updateShow()`, `deleteShow()`
   - Métodos para applications: `getApplications()`, `acceptApplication()`, `rejectApplication()`
   - Métodos para events: `getEvents()`, `createEvent()`

3. **`lib/core/services/storage_service.dart`** (actualizado)
   - ✅ Agregados métodos para token JWT: `saveToken()`, `getToken()`
   - ✅ Métodos para user ID: `saveUserId()`, `getUserId()`
   - ✅ Método `clearAuthData()` para logout

4. **`lib/core/services/auth_service.dart`** (actualizado)
   - ✅ Nuevos métodos: `signUpWithBackend()`, `signInWithBackend()`, `signOutFromBackend()`
   - ✅ Modo híbrido: funciona con Firebase o solo con backend NestJS

5. **`lib/models/show_model.dart`** (actualizado)
   - ✅ Modelos: `ShowModel`, `PromoterModel`, `ApplicationModel`
   - ✅ Sincronizados con entidades de NestJS

#### Estado:
- ✅ **LISTO PARA USAR** - Necesita agregar dependencia `http` en pubspec.yaml

---

## 🚀 Pasos para Iniciar el Sistema

### 1️⃣ Preparar el Backend

```bash
cd C:\Users\GIGABYTE\Documents\Universidad\vibe-stage-backend\backend

# Asegúrate de que el backend esté corriendo
npm run start:dev

# Espera a ver: "Nest application successfully started"
```

### 2️⃣ Poblar la Base de Datos (SOLO LA PRIMERA VEZ)

```bash
# En otra terminal, ejecuta:
npm run seed
```

**Resultado esperado:**
```
🎉 Seed completado exitosamente!

📊 Resumen:
  - 3 Promotores
  - 2 Artistas
  - 10 Shows/Oportunidades
  - 2 Eventos

🔑 Credenciales de prueba (password: 123456):

  PROMOTORES:
  - carlos@promotor.com
  - maria@eventos.com
  - juan@producciones.com

  ARTISTAS:
  - rockeros@banda.com
  - ana@jazz.com
```

### 3️⃣ Configurar App de Flutter

```bash
cd C:\Users\GIGABYTE\StudioProjects\vibestage_app

# Agregar dependencia http al pubspec.yaml
```

**Edita `pubspec.yaml`** y agrega:
```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0  # AGREGAR ESTA LÍNEA
  shared_preferences: ^2.2.2  # Ya debería estar
  # ... otras dependencias
```

Luego ejecuta:
```bash
flutter pub get
```

### 4️⃣ Probar App de Kotlin (Artistas)

1. Abre el proyecto en Android Studio
2. Verifica que `ApiConfig.kt` tenga: `const val BASE_URL = "http://10.0.2.2:3000/"`
3. Ejecuta en emulador Android
4. Registra un artista o usa: `rockeros@banda.com` / `123456`
5. Deberías ver los 10 shows creados por el seed

### 5️⃣ Probar App de Flutter (Promotores)

1. Abre el proyecto en VS Code o Android Studio
2. Verifica que `api_config.dart` tenga: `static const String baseUrl = 'http://10.0.2.2:3000';`
3. Ejecuta en emulador/simulador
4. Registra un promotor o usa: `carlos@promotor.com` / `123456`
5. Deberías poder crear nuevos shows y ver postulaciones

---

## 🧪 Flujo de Prueba Completo

### Escenario: Artista se postula a un show

1. **En App Kotlin (Artista):**
   - Login como artista: `rockeros@banda.com` / `123456`
   - Buscar shows disponibles
   - Postularse a "Noche de Rock en Barranco"

2. **En Backend:**
   - La postulación se guarda en memoria (ApplicationsModule)
   - Estado: `pending`

3. **En App Flutter (Promotor):**
   - Login como promotor: `carlos@promotor.com` / `123456`
   - Ver postulaciones de tu evento
   - Aceptar o rechazar la postulación

4. **En Backend:**
   - Si se acepta: Se crea automáticamente un Show vinculado
   - Estado cambia a: `accepted`

5. **En App Kotlin (Artista):**
   - Ver que la postulación fue aceptada
   - Ver detalles del show confirmado

---

## 📝 Datos de Prueba Disponibles

### Promotores
| Email | Nombre | Especialidad |
|-------|--------|-------------|
| carlos@promotor.com | Carlos Promotor | Rock y Metal |
| maria@eventos.com | María Eventos | Jazz y Acústica |
| juan@producciones.com | Juan Producciones | Indie y Alternativo |

### Artistas
| Email | Nombre | Género |
|-------|--------|--------|
| rockeros@banda.com | Los Rockeros | Rock Alternativo |
| ana@jazz.com | Ana Jazz | Jazz y Soul |

### Shows Creados (10 oportunidades)
1. **Noche de Rock en Barranco** - Rock - 15 Mar
2. **Festival Rock Underground** - Rock - 20 Mar
3. **Jazz Night - Viernes Acústico** - Jazz - 18 Mar
4. **Sunday Jazz Brunch** - Jazz - 24 Mar
5. **Indie Showcase - Nueva Escena** - Indie - 22 Mar
6. **Acústico en Azotea** - Acústico - 28 Mar
7. **Electro Night - DJ + Live Act** - Electrónica - 30 Mar
8. **Pop Latino - Fiesta Nocturna** - Pop - 5 Abr
9. **Reggae Beach Party** - Reggae - 10 Abr
10. **Cumbia Fusión - Viernes Popular** - Cumbia - 12 Abr

---

## 🔧 Configuración por Dispositivo

### Emulador Android (Ambas Apps)
```kotlin
// Kotlin: ApiConfig.kt
const val BASE_URL = "http://10.0.2.2:3000/"

// Flutter: api_config.dart
static const String baseUrl = 'http://10.0.2.2:3000';
```

### iOS Simulator (Solo Flutter)
```dart
// Flutter: api_config.dart
static const String baseUrl = 'http://localhost:3000';
// o
static const String baseUrl = 'http://127.0.0.1:3000';
```

### Dispositivo Físico (Ambas Apps)
1. Obtén tu IP local:
   ```cmd
   ipconfig
   ```
   Busca IPv4 (ej: `192.168.1.100`)

2. Actualiza el backend `main.ts`:
   ```typescript
   await app.listen(3000, '0.0.0.0');
   ```

3. Actualiza las apps:
   ```kotlin
   // Kotlin
   const val BASE_URL = "http://192.168.1.100:3000/"
   
   // Flutter
   static const String baseUrl = 'http://192.168.1.100:3000';
   ```

---

## 🐛 Solución de Problemas

### Backend no inicia
```bash
# Verificar que las dependencias estén instaladas
npm install

# Verificar conexión a Railway
# Prueba las credenciales en MySQL Workbench o similar
```

### "Unable to connect to database"
- Verifica el `.env` con las credenciales de Railway
- Asegúrate de que Railway permita conexiones externas
- Verifica que la base de datos esté activa en Railway

### Apps no conectan al backend
- **Emulador Android**: Usa `10.0.2.2` NO `localhost`
- **iOS Simulator**: Usa `localhost` o `127.0.0.1`
- **Dispositivo físico**: Usa tu IP local y `0.0.0.0` en el backend
- Verifica que el backend esté corriendo (`npm run start:dev`)

### Seed falla
```bash
# Asegúrate de que el backend esté corriendo primero
npm run start:dev

# En otra terminal:
npm run seed
```

### Token JWT expirado
- El token expira después de un tiempo
- Simplemente vuelve a hacer login
- Los tokens se guardan en SharedPreferences (Flutter) y TokenManager (Kotlin)

---

## 📊 Estado Actual del Proyecto

| Componente | Estado | Notas |
|------------|--------|-------|
| Backend NestJS | ✅ Funcionando | Conectado a Railway MySQL |
| Base de Datos | ✅ Lista | Vacía hasta ejecutar seed |
| Script Seed | ✅ Listo | `npm run seed` |
| App Kotlin (Artistas) | ✅ Lista | Solo falta probar |
| App Flutter (Promotores) | ⚠️ Casi lista | Agregar dep `http` |
| Documentación | ✅ Completa | Este archivo |

---

## 🎯 Próximos Pasos Recomendados

1. ✅ **Ejecutar el seed** para poblar la base de datos
2. ✅ **Probar login** en ambas apps
3. ✅ **Crear un show** desde Flutter (promotor)
4. ✅ **Postularse al show** desde Kotlin (artista)
5. ✅ **Gestionar postulación** desde Flutter (promotor)
6. 🔄 **Implementar persistencia de Applications** en base de datos (actualmente en memoria)
7. 🔄 **Agregar validaciones** adicionales
8. 🔄 **Desplegar en Railway** para producción

---

## 🚀 Deploy a Producción (Railway)

Cuando estés listo para desplegar:

1. **Subir código a GitHub**
2. **Conectar Railway con tu repo**
3. **Configurar variables de entorno en Railway**
4. **Obtener URL pública** (ej: `https://vibe-stage-backend.up.railway.app`)
5. **Actualizar ambas apps** con la nueva URL

---

✨ **¡Todo está configurado y listo para funcionar!**

**Password universal para pruebas: `123456`**

