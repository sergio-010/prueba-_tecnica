# 🧪 Prueba Técnica - Gestión de Perfil de Usuario

Una aplicación frontend moderna desarrollada con **Next.js**, **TypeScript**, **Tailwind CSS** y **shadcn/ui** que consume APIs REST autenticadas con JWT para gestión completa de perfiles de usuario.

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

La aplicación consume las siguientes APIs:

| Función            | Método | Endpoint                        | Descripción              |
| ------------------ | ------ | ------------------------------- | ------------------------ |
| **Login**          | POST   | `/usuarios/api/login/`          | Autenticación de usuario |
| **Obtener Perfil** | GET    | `/usuarios/api/perfil/`         | Información del perfil   |
| **Editar Perfil**  | PUT    | `/usuarios/api/usuario/perfil/` | Actualización de datos   |
| **Subir Foto**     | PATCH  | `/usuarios/api/perfil/foto/`    | Actualización de foto    |

**Base URL**: `http://46.202.88.87:8010`

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

1. **Login**: Usa las credenciales proporcionadas
2. **Ver Perfil**: Navega automáticamente después del login
3. **Editar Perfil**: Usa el botón "Editar Perfil"
4. **Subir Foto**: Usa el botón de edición en el avatar
5. **Logout**: Usa el botón "Cerrar Sesión"

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
# prueba-_tecnica
