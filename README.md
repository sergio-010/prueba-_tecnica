# 🧪 Prueba Técnica - Gestión de Perfil de Usuario

Una aplicación frontend moderna desarrollada con **Next.js**, **TypeScript**, **Tailwind CSS** y **shadcn/ui** que consume APIs REST autenticadas con JWT para gestión completa de perfiles de usuario.

## ⚠️ Estado Actual de la API

**La API externa no está disponible** (`http://46.202.88.87:8010` - Connection timeout)

🎭 **Solución Implementada**: La aplicación incluye un **modo demo completo** que se activa automáticamente cuando detecta problemas de conectividad. Todas las funcionalidades están disponibles con datos de demostración realistas.

✅ **La aplicación funciona completamente** - Puedes probar todas las características sin limitaciones.

## 🚀 Características Principales

- ✅ **Autenticación JWT** - Login seguro con tokens de acceso y refresh
- 👤 **Visualización de Perfil** - Vista completa de información personal
- ✏️ **Edición de Perfil** - Formulario completo para actualizar datos
- 📸 **Subida de Fotos** - Actualización de foto de perfil con preview
- 🎨 **Interfaz Moderna** - Diseño responsive con shadcn/ui y Tailwind CSS
- 🔄 **Estados de Carga** - Feedback visual durante operaciones
- 🔔 **Notificaciones** - Mensajes de éxito y error en tiempo real
- 📱 **Responsive Design** - Adaptable a diferentes tamaños de pantalla

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15.5.2 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

## 📋 Funcionalidades Implementadas

### 🔐 1. Autenticación

- Formulario de login con validación
- Manejo de tokens JWT (access + refresh)
- Almacenamiento seguro en localStorage
- Verificación automática de autenticación

### 👤 2. Visualización de Perfil

- Información personal completa
- Avatar con iniciales si no hay foto
- Enlaces a redes sociales
- Badges de estado (verificado, tipo de usuario)
- Biografía y datos de contacto

### ✏️ 3. Edición de Perfil

- Formulario completo con validación
- Campos para información personal
- URLs de redes sociales con validación
- Selectors para tipo de usuario y naturaleza
- Actualización en tiempo real

### 📸 4. Gestión de Fotos

- Selección de archivos con validación
- Preview antes de subir
- Soporte para múltiples formatos (JPG, PNG, GIF)
- Límite de tamaño (5MB)
- Feedback visual del proceso

## 🏃‍♂️ Instrucciones de Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-tecnica
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

### 4. Abrir en el navegador

Navega a [http://localhost:3000](http://localhost:3000)

## 🔑 Credenciales de Prueba

Para probar la aplicación, utiliza las siguientes credenciales:

```
Usuario: carlosandresmoreno
Contraseña: 90122856_Hanz
```

_Estas credenciales ya están precargadas en el formulario de login para facilitar las pruebas._

## 🌐 APIs Consumidas

⚠️ **IMPORTANTE**: La API externa no está actualmente disponible (`http://46.202.88.87:8010`)

La aplicación está configurada para consumir las siguientes APIs:

| Función            | Método | Endpoint                        | Descripción              | Estado           |
| ------------------ | ------ | ------------------------------- | ------------------------ | ---------------- |
| **Login**          | POST   | `/usuarios/api/login/`          | Autenticación de usuario | ❌ No disponible |
| **Obtener Perfil** | GET    | `/usuarios/api/perfil/`         | Información del perfil   | ❌ No disponible |
| **Editar Perfil**  | PUT    | `/usuarios/api/usuario/perfil/` | Actualización de datos   | ❌ No disponible |
| **Subir Foto**     | PATCH  | `/usuarios/api/perfil/foto/`    | Actualización de foto    | ❌ No disponible |

**Base URL**: `http://46.202.88.87:8010`

### 🎭 Modo Demo

Debido a que la API externa no está disponible, la aplicación incluye un **modo demo** que se activa automáticamente cuando:

- No se puede conectar al servidor
- Hay un timeout en la conexión
- Se detecta que estamos en modo desarrollo

#### Características del Modo Demo:

- ✅ **Login simulado** con las credenciales de prueba
- ✅ **Datos de demostración** realistas
- ✅ **Edición de perfil** funcional (datos guardados localmente)
- ✅ **Subida de fotos** simulada con preview
- ✅ **Todas las funcionalidades** de la interfaz funcionan
- ✅ **Delays de red simulados** para experiencia realista

#### Datos Demo Incluidos:

```json
{
  "user": {
    "first_name": "Carlos",
    "last_name": "Moreno",
    "email": "carlos@example.com"
  },
  "telefono": "123456789",
  "tipo_usuario": "instructor",
  "tipo_naturaleza": "natural",
  "biografia": "Instructor de tecnología con experiencia en desarrollo web",
  "documento": "12345678",
  "linkedin": "https://www.linkedin.com/in/carlos-moreno",
  "twitter": "https://twitter.com/carlosmoreno",
  "github": "https://github.com/carlosmoreno",
  "sitio_web": "https://carlosmoreno.dev",
  "esta_verificado": true
}
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes de shadcn/ui
│   ├── App.tsx           # Componente principal
│   ├── LoginForm.tsx     # Formulario de login
│   ├── ProfileView.tsx   # Vista de perfil
│   ├── EditProfileForm.tsx # Formulario de edición
│   └── PhotoUpload.tsx   # Subida de fotos
├── contexts/             # Contextos de React
│   └── AuthContext.tsx   # Contexto de autenticación
├── hooks/                # Hooks personalizados
│   └── useAuth.ts        # Hook de autenticación
├── lib/                  # Utilidades y servicios
│   ├── api.ts           # Servicio de API
│   └── utils.ts         # Utilidades generales
└── types/                # Definiciones de tipos
    └── auth.ts          # Tipos de autenticación
```

## 🎯 Metodología "Result Pattern"

La aplicación implementa el patrón "Result" para el manejo de respuestas de API, proporcionando:

```typescript
interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Beneficios:

- ✅ Manejo consistente de errores
- ✅ Tipado fuerte con TypeScript
- ✅ Código más legible y mantenible
- ✅ Separación clara entre éxito y error

### Ejemplo de uso:

```typescript
const result = await apiService.loginResult(credentials);
if (result.success) {
  // Manejar éxito
  console.log(result.data);
} else {
  // Manejar error
  console.error(result.error);
}
```

## 🔒 Seguridad

- **JWT Tokens**: Manejo seguro de tokens de autenticación
- **Validación**: Validación client-side con Zod
- **Headers de Autorización**: Tokens enviados correctamente en headers
- **Validación de Archivos**: Verificación de tipo y tamaño de archivos

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a:

- 📱 Móviles (320px+)
- 📟 Tablets (768px+)
- 💻 Escritorio (1024px+)

## 🧪 Testing

Para probar la aplicación:

### 🎭 Modo Demo (Automático)

La aplicación detectará automáticamente que la API no está disponible y activará el modo demo.

1. **Login**: Usa las credenciales proporcionadas
   ```
   Usuario: carlosandresmoreno
   Contraseña: 90122856_Hanz
   ```
2. **Ver Perfil**: Navega automáticamente después del login
3. **Editar Perfil**: Usa el botón "Editar Perfil" - los cambios se guardan localmente
4. **Subir Foto**: Usa el botón de edición en el avatar - se mostrará preview local
5. **Logout**: Usa el botón "Cerrar Sesión"

### 📊 Características Probables:

- ✅ **Autenticación** - Login/Logout completo
- ✅ **Visualización** - Perfil con datos realistas
- ✅ **Edición** - Formulario completo con validación
- ✅ **Fotos** - Subida y preview de imágenes
- ✅ **Responsive** - Funciona en móvil, tablet y escritorio
- ✅ **Notificaciones** - Mensajes de éxito/error
- ✅ **Estados de Carga** - Feedback visual apropiado

### 🔧 Resolución de Problemas

Si la API real vuelve a estar disponible:

1. La aplicación intentará conectarse automáticamente
2. El modo demo se desactivará
3. Los datos reales reemplazarán los datos demo

## 🔄 ¿Qué hacer si la API vuelve a funcionar?

### Verificación Automática

La aplicación está diseñada para **detectar automáticamente** cuando la API vuelve a estar disponible:

1. **En cada login**: Siempre intenta primero conectarse a la API real
2. **Fallback inteligente**: Solo usa modo demo si hay error de conexión
3. **Sin configuración manual**: No necesitas cambiar nada en el código

### Pasos Recomendados

#### 1. **Verificar Conectividad**

```bash
# Probar la API directamente
curl -X POST http://46.202.88.87:8010/usuarios/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"carlosandresmoreno","password":"90122856_Hanz"}'
```

#### 2. **Limpiar Datos Demo** (Opcional)

```javascript
// En la consola del navegador
localStorage.removeItem("demo_mode");
localStorage.removeItem("access_token");
localStorage.removeItem("refresh_token");
// Luego recargar la página
window.location.reload();
```

#### 3. **Probar Login Real**

- Usa las mismas credenciales: `carlosandresmoreno` / `90122856_Hanz`
- La aplicación automáticamente usará la API real si está disponible
- Verás en la consola del navegador logs indicando "Respuesta del servidor" en lugar de "Usando modo demo"

### Indicadores de API Real vs Demo

#### 🌐 **API Real Funcionando:**

- Console logs: `"Respuesta del servidor: 200 OK"`
- Datos del perfil vienen del servidor
- Las ediciones se guardan permanentemente en el servidor
- Fotos se suben realmente al servidor

#### 🎭 **Modo Demo Activo:**

- Console logs: `"Usando modo demo"`
- Datos precargados localmente
- Las ediciones solo se guardan en localStorage
- Fotos se muestran como preview local

### Transición Suave

La aplicación maneja la transición de forma **completamente transparente**:

- ✅ **Sin interrupciones** en la experiencia de usuario
- ✅ **Sin cambios de código** necesarios
- ✅ **Mismas credenciales** funcionan en ambos modos
- ✅ **Misma interfaz** en ambos casos

### Verificación del Estado

Para verificar qué modo está activo:

```javascript
// En la consola del navegador
console.log("Modo demo activo:", localStorage.getItem("demo_mode") === "true");
console.log("Token actual:", localStorage.getItem("access_token"));
```

### Consideraciones de Datos

⚠️ **Importante**: Los datos modificados en modo demo se almacenan localmente y se perderán cuando la aplicación use la API real. Esto es el comportamiento esperado y correcto.

## 🚀 Compilación para Producción

```bash
npm run build
npm start
```

## 👨‍💻 Desarrollado por

Esta aplicación fue desarrollada como parte de una prueba técnica, implementando todas las funcionalidades requeridas con las mejores prácticas de desarrollo frontend moderno.

## 📝 Notas Adicionales

- La aplicación maneja automáticamente los estados de carga
- Los errores de API se muestran de forma amigable al usuario
- La interfaz proporciona feedback visual para todas las acciones
- El código está bien estructurado y comentado para facilitar el mantenimiento

# prueba-\_tecnica
