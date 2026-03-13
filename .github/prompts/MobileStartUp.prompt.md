Admin Mobile App - Base Blueprint
Purpose: Comprehensive reference for initializing and developing a generic administrative mobile application using React Native, Expo Router, y Clean Architecture.

Application Overview
Core Concept
A scalable, mobile-first administrative dashboard template. It provides a secure authentication flow and a hybrid navigation system (Sidebar + Bottom Tabs) to manage data, view analytics, and configure user settings.

Key Features (The 90% Rule)
Authentication Flow: Login, Password Recovery, and secure session management.

Hybrid Navigation: * Sidebar (Drawer): Para navegación profunda (Módulos principales, Reportes, Configuración).

Bottom Bar (Tabs): Para acceso rápido a las vistas más usadas (Dashboard, Entidades principales, Perfil).

Dashboard (Home): Vista general con KPIs (Key Performance Indicators) y resúmenes.

CRUD Genérico (Entities/Users): Listados con búsqueda/filtros, y vistas de detalle/edición.

Profile & Settings: Gestión de cuenta de usuario, preferencias de la app (Dark/Light mode) y cierre de sesión.

Technology Stack
Frontend Framework: React Native con Expo.

Navigation: Expo Router (basado en archivos) utilizando @react-navigation/drawer y tabs nativos.

Data Fetching & State: @tanstack/react-query para estado del servidor y caché; Zustand o Context API para el estado global ligero (UI, Tema).

Forms & Validation: react-hook-form + zod para manejo impecable de formularios.

UI Components: Componentes nativos estilizados o librerías utilitarias (ej. NativeWind o StyleSheet tradicional).

Project Structure (Feature-First)
La estructura sigue un patrón de "features" para que los módulos sean autocontenidos y fáciles de replicar.

Plaintext
admin-mobile-base/
├── app/                         (Expo Router screens)
│   ├── _layout.tsx              (Root layout: Session provider)
│   ├── (auth)/                  (Public routes)
│   │   ├── login.tsx
│   │   └── forgot-password.tsx
│   └── (app)/                   (Protected routes)
│       ├── _layout.tsx          (Drawer Navigation Layout)
│       ├── (tabs)/              (Bottom Tabs Navigation)
│       │   ├── _layout.tsx      
│       │   ├── dashboard.tsx    (Home/KPIs)
│       │   ├── entities.tsx     (Listado principal)
│       │   └── profile.tsx      (User Profile)
│       ├── settings/            (Accedido vía Drawer)
│       │   └── index.tsx
│       └── entities/            (Vistas detalladas)
│           ├── [id].tsx         (Detalle/Edición)
│           └── create.tsx       (Creación)
├── src/
│   ├── features/                (Módulos de negocio)
│   │   ├── auth/                (Login, Tokens)
│   │   ├── users/               (Gestión de usuarios del sistema)
│   │   └── generic-entity/      (Plantilla para Clientes, Productos, etc.)
│   │       ├── model/           (Zod schemas, interfaces)
│   │       ├── api/             (Axios calls)
│   │       ├── hooks/           (React Query mutations/queries)
│   │       └── components/      (UI específica del módulo)
│   ├── shared/                  (Código común)
│   │   ├── api/                 (Axios client, interceptors)
│   │   ├── components/          (Botones, Inputs, Modales genéricos)
│   │   ├── theme/               (Colores, tipografía)
│   │   └── store/               (Zustand stores, ej. useAuthStore)
├── app.json
├── package.json
└── tsconfig.json
Phase 1: Project Initialization
1.1 Create Expo Project
Bash
npx create-expo-app@latest admin-mobile --template blank-typescript
cd admin-mobile
1.2 Install Core Dependencies
Bash
# Navegación Híbrida (Tabs + Drawer)
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated

# Formularios y Validación
npm install react-hook-form @hookform/resolvers zod

# Fetching de Datos y Estado Local
npm install @tanstack/react-query axios zustand

# Almacenamiento Seguro (Tokens)
npx expo install expo-secure-store
1.3 Configure Babel (Para Reanimated/Drawer)
Actualiza tu babel.config.js (necesario para el Drawer y animaciones):

JavaScript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
Phase 2: Core Architecture & Navigation Flow
2.1 The Authentication Gatekeeper
El archivo raíz app/_layout.tsx será el responsable de decidir qué "stack" de navegación mostrar dependiendo de si hay un token válido.

Estado No Autenticado: Muestra el grupo (auth) (Login).

Estado Autenticado: Muestra el grupo (app) (El sistema administrativo).

2.2 Navigation Strategy (Drawer wrapping Tabs)
Para aplicaciones administrativas, el patrón estándar es tener un menú lateral (Drawer) que envuelve a una barra inferior (Tabs).

app/(app)/_layout.tsx: Renderiza el <Drawer>. Aquí pondrás enlaces a Módulos secundarios, Configuración y Soporte.

app/(app)/(tabs)/_layout.tsx: Renderiza los <Tabs>. Aquí pondrás el Dashboard, el módulo principal (ej. Usuarios/Clientes) y el Perfil rápido.

Phase 3: "The 90%" Features Specification
Feature 1: Auth & Security (src/features/auth)
Responsabilidad: Manejar el login, refresco de tokens interceptando Axios (código 401), y almacenamiento seguro en el llavero nativo (expo-secure-store).

UI: Pantalla de Login limpia con validación de inputs (correo válido, contraseña mínima) antes de golpear la API.

Feature 2: Dashboard (app/(app)/(tabs)/dashboard.tsx)
Responsabilidad: Dar un resumen operativo.

Componentes clave: * Tarjetas de resumen estadístico (Componente genérico SummaryCard).

Listado de actividad reciente o tareas pendientes.

Pull-to-refresh configurado por defecto.

Feature 3: Generic CRUD / Data Table (src/features/generic-entity)
Responsabilidad: Plantilla base para cualquier módulo (Clientes, Empleados, Órdenes).

Componentes clave:

List View: FlatList optimizado, barra de búsqueda en el header, filtros básicos y paginación infinita (usando useInfiniteQuery de React Query).

Detail/Form View: Formulario reactivo (react-hook-form) reutilizable para Crear y Editar, validando contra el esquema de Zod.

Feature 4: Settings & Preferences (app/(app)/settings/)
Responsabilidad: Configuración del entorno.

Opciones estándar:

Toggle Tema Claro / Oscuro.

Idioma de la aplicación.

Botón de cierre de sesión (Que borra el SecureStore y resetea el caché de React Query).

Phase 4: API & HTTP Client Standards
4.1 Axios Interceptor Setup (src/shared/api/client.ts)
Todo proyecto administrativo necesita un cliente HTTP que inyecte el token en cada petición y sepa qué hacer si expira:

TypeScript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Implementar lógica de retry para el 401 (Refresh Token) en los interceptores de respuesta.
Development Workflow & Pre-commit
Define scripts claros en tu package.json para levantar el entorno de desarrollo (expo start).

Mantén los esquemas de Zod estrictamente sincronizados con lo que espera/devuelve tu backend.

Usa un queryClient centralizado para invalidar cachés fácilmente cuando edites una entidad (ej: editaste el "Usuario X", invalidas la lista general de Usuarios para que se actualice sola).