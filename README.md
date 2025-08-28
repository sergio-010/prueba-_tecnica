# 🧪 Prueba Técnica - Gestión de Perfil de Usuario

Una aplicación frontend moderna desarrollada con **Next.js**, **TypeScript**, **Tailwind CSS** y **shadcn/ui** que consume APIs REST autenticadas con JWT para gestión completa de perfiles de usuario.

## 🚀 Características Principales

- ✅ **Autenticación JWT** - Login seguro con tokens de acceso y refresh
- 👤 **Visualización de Perfil** - Vista completa de información personal
- ✏️ **Edición de Perfil** - Formulario completo para actualizar datos
- 📸 **Subida de Fotos** - Actualización de foto de perfil con preview
- 🎨 **Interfaz Moderna** - Diseño responsive con shadcn/ui y Tailwind CSS
- 🔄 **Estados de Carga** - Feedback visual durante operaciones
- 🛡️ **Manejo de Errores** - Gestión robusta de errores con notificaciones
- 🔐 **Seguridad** - Gestión automática de tokens y refresh

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.5.2** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Diseño responsivo y moderno
- **shadcn/ui** - Componentes UI de alta calidad
- **Zustand** - Gestión de estado global
- **Sonner** - Notificaciones toast elegantes

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Turbopack** - Bundler ultrarrápido
- **PostCSS** - Procesamiento de CSS

## 📁 Estructura del Proyecto

```
src/
├── actions/          # Server actions para API calls
│   ├── auth.ts      # Autenticación y tokens
│   └── profile.ts   # Gestión de perfil
├── app/             # App Router de Next.js
│   ├── api/         # API proxy routes
│   ├── globals.css  # Estilos globales
│   ├── layout.tsx   # Layout principal
│   └── page.tsx     # Página home
├── components/      # Componentes React
│   ├── ui/          # Componentes shadcn/ui
│   ├── AuthenticatedApp.tsx
│   ├── EditProfileForm.tsx
│   ├── LoginForm.tsx
│   └── ProfileView.tsx
├── lib/             # Utilidades
│   └── utils.ts     # Helpers y configuraciones
├── store/           # Estado global
│   └── authStore.ts # Store de autenticación
└── types/           # Definiciones TypeScript
    └── interfaces.ts # Interfaces y tipos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd prueba-tecnica

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run start        # Ejecuta la versión de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🔗 API Endpoints

La aplicación consume los siguientes endpoints a través de rutas proxy:

- `POST /api/usuarios/login/` - Autenticación de usuario
- `POST /api/usuarios/token/refresh/` - Renovación de tokens
- `GET /api/usuarios/perfil/` - Obtener perfil de usuario
- `PUT /api/usuarios/usuario/perfil/` - Actualizar perfil
- `PATCH /api/usuarios/perfil/foto/` - Subir foto de perfil

## 🏗️ Arquitectura

### Patrón de Acciones
La aplicación utiliza un patrón de acciones para el manejo de API calls:

```typescript
// Patrón Result<T> para manejo consistente de respuestas
interface Result<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}

// Ejemplo de acción
export async function loginAction(credentials: ILoginCredentials): Promise<Result<ILoginResponse>> {
  // Implementación de la llamada API
}
```

### Gestión de Estado
- **Zustand** para estado global de autenticación
- **React Hook State** para estado local de componentes
- **Server Actions** para operaciones de API

### Proxy API
Las rutas API de Next.js actúan como proxy para evitar problemas de CORS:
```typescript
// /app/api/usuarios/[...path]/route.ts
export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  // Proxy hacia la API externa
}
```

## 🔐 Autenticación

### Flow de Autenticación
1. Usuario ingresa credenciales
2. Se obtienen tokens JWT (access + refresh)
3. Tokens se almacenan en localStorage
4. Requests subsequentes incluyen token de autorización
5. Refresh automático cuando el token expira

### Gestión de Tokens
```typescript
// Función automática de refresh de tokens
export async function getToken(): Promise<Result<string>> {
  const token = localStorage.getItem('access_token');
  
  if (isTokenExpired(token)) {
    return await refreshTokenAction();
  }
  
  return { ok: true, data: token, error: null };
}
```

## 🎨 Componentes Principales

### LoginForm
- Formulario de autenticación
- Validación de campos
- Manejo de estados de carga
- Integración con store de autenticación

### ProfileView
- Visualización de información de perfil
- Subida de fotos con preview
- Navegación a modo edición
- Funcionalidad de logout

### EditProfileForm
- Formulario completo de edición
- Validación de datos
- Actualización en tiempo real
- Cancelación de cambios

## 🛡️ Seguridad

- **JWT Tokens** - Autenticación segura
- **Refresh Tokens** - Renovación automática de sesión
- **Validación de Tipos** - TypeScript para prevenir errores
- **Sanitización de Inputs** - Validación en formularios
- **Headers de Seguridad** - Configuración de CORS

## 🎯 Funcionalidades Implementadas

### ✅ Autenticación
- [x] Login con username/password
- [x] Manejo de tokens JWT
- [x] Refresh automático de tokens
- [x] Logout seguro
- [x] Persistencia de sesión

### ✅ Perfil de Usuario
- [x] Visualización de datos personales
- [x] Edición de información básica
- [x] Subida de foto de perfil
- [x] Preview de cambios
- [x] Validación de formularios

### ✅ Interfaz de Usuario
- [x] Diseño responsive
- [x] Estados de carga
- [x] Notificaciones toast
- [x] Manejo de errores
- [x] Navegación intuitiva

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```bash
# .env.local (opcional)
NEXT_PUBLIC_API_BASE_URL=http://46.202.88.87:8010/usuarios/api
```

### Configuración de shadcn/ui
```json
// components.json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de CORS**
   - Verificar que las rutas proxy estén funcionando
   - Comprobar configuración de API routes

2. **Token Expirado**
   - El sistema maneja automáticamente el refresh
   - Verificar configuración de localStorage

3. **Problemas de Build**
   - Verificar tipos TypeScript
   - Comprobar imports y exports

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ para la prueba técnica**
