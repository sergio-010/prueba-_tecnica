import { create } from "zustand";

// Interfaces simples
interface User {
  first_name: string;
  last_name: string;
  email?: string;
}

interface UserProfile {
  user: User;
  telefono: string;
  tipo_usuario: string;
  tipo_naturaleza: string;
  biografia: string;
  documento: string;
  linkedin: string;
  twitter: string;
  github: string;
  sitio_web: string;
  esta_verificado: boolean;
  foto?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  // Estado
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Acciones
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  loadUserProfile: () => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
  uploadPhoto: (file: File) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  checkAuthStatus: () => void;
}

const API_BASE = "http://46.202.88.87:8010/usuarios/api";

// Datos de demostración para modo desarrollo
const DEMO_USER: UserProfile = {
  user: {
    first_name: "Carlos",
    last_name: "Moreno",
    email: "carlos@example.com",
  },
  telefono: "123456789",
  tipo_usuario: "instructor",
  tipo_naturaleza: "natural",
  biografia: "Instructor de tecnología con experiencia en desarrollo web",
  documento: "12345678",
  linkedin: "https://www.linkedin.com/in/carlos-moreno",
  twitter: "https://twitter.com/carlosmoreno",
  github: "https://github.com/carlosmoreno",
  sitio_web: "https://carlosmoreno.dev",
  esta_verificado: true,
  foto: undefined,
};

// Función para simular delay de red
const simulateNetworkDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

// Función para verificar si usar modo demo
const isDemoMode = () => {
  return (
    localStorage.getItem("demo_mode") === "true" ||
    process.env.NODE_ENV === "development"
  );
};

export const useAuthStore = create<AuthState>((set, get) => ({
  // Estado inicial
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // Verificar estado de autenticación
  checkAuthStatus: () => {
    const token = localStorage.getItem("access_token");
    const isAuth = !!token;

    set({
      isAuthenticated: isAuth,
      isLoading: false,
    });

    // Si está en modo demo y tiene token, cargar usuario demo
    if (isAuth && isDemoMode() && token === "demo_token_123") {
      set({ user: DEMO_USER });
      return;
    }

    // Si está autenticado pero no hay usuario, cargar perfil
    if (isAuth && !get().user) {
      set({ isLoading: true });
      get()
        .loadUserProfile()
        .finally(() => {
          set({ isLoading: false });
        });
    }
  },

  // Función de login
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    set({ isLoading: true });

    try {
      console.log("Intentando login con:", credentials);

      // Verificar si usar modo demo
      if (isDemoMode()) {
        console.log("Usando modo demo");
        await simulateNetworkDelay();

        // Simular login exitoso con credenciales de prueba
        if (
          credentials.username === "carlosandresmoreno" &&
          credentials.password === "90122856_Hanz"
        ) {
          localStorage.setItem("access_token", "demo_token_123");
          localStorage.setItem("refresh_token", "demo_refresh_123");
          localStorage.setItem("demo_mode", "true");

          set({
            isAuthenticated: true,
            user: DEMO_USER,
            isLoading: false,
          });

          return true;
        } else {
          set({ isLoading: false });
          return false;
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(
        "Respuesta del servidor:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        console.error("Error en la respuesta:", await response.text());
        set({ isLoading: false });
        return false;
      }

      const data = await response.json();
      console.log("Datos recibidos:", data);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      set({ isAuthenticated: true });

      // Cargar perfil después del login
      const profileLoaded = await get().loadUserProfile();
      set({ isLoading: false });

      return profileLoaded;
    } catch (error) {
      console.error("Error en login:", error);

      // Si hay error de conexión, activar modo demo automáticamente
      if (
        error instanceof Error &&
        (error.name === "AbortError" || error.message.includes("fetch"))
      ) {
        console.log("Error de conexión detectado, activando modo demo");
        localStorage.setItem("demo_mode", "true");

        await simulateNetworkDelay();

        if (
          credentials.username === "carlosandresmoreno" &&
          credentials.password === "90122856_Hanz"
        ) {
          localStorage.setItem("access_token", "demo_token_123");
          localStorage.setItem("refresh_token", "demo_refresh_123");

          set({
            isAuthenticated: true,
            user: DEMO_USER,
            isLoading: false,
          });

          return true;
        }
      }

      set({ isLoading: false });
      return false;
    }
  },

  // Función de logout
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // Cargar perfil de usuario
  loadUserProfile: async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return false;

      // Si está en modo demo
      if (isDemoMode() && token === "demo_token_123") {
        await simulateNetworkDelay();
        set({ user: DEMO_USER });
        return true;
      }

      const response = await fetch(`${API_BASE}/perfil/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          get().logout();
        }
        return false;
      }

      const data = await response.json();
      set({ user: data });
      return true;
    } catch (error) {
      return false;
    }
  },

  // Actualizar perfil
  updateProfile: async (profileData: any): Promise<boolean> => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return false;

      // Si está en modo demo
      if (isDemoMode() && token === "demo_token_123") {
        await simulateNetworkDelay();
        // Actualizar datos demo
        const updatedUser = {
          ...DEMO_USER,
          ...profileData,
          user: {
            ...DEMO_USER.user,
            ...profileData.user,
          },
        };
        set({ user: updatedUser });
        return true;
      }

      const response = await fetch(`${API_BASE}/usuario/perfil/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) return false;

      await get().loadUserProfile();
      return true;
    } catch (error) {
      return false;
    }
  },

  // Subir foto
  uploadPhoto: async (file: File): Promise<boolean> => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return false;

      // Si está en modo demo
      if (isDemoMode() && token === "demo_token_123") {
        await simulateNetworkDelay();
        // Simular subida de foto
        const updatedUser = {
          ...get().user!,
          foto: URL.createObjectURL(file),
        };
        set({ user: updatedUser });
        return true;
      }

      const formData = new FormData();
      formData.append("foto", file);

      const response = await fetch(`${API_BASE}/perfil/foto/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) return false;

      await get().loadUserProfile();
      return true;
    } catch (error) {
      return false;
    }
  },

  // Establecer estado de carga
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
