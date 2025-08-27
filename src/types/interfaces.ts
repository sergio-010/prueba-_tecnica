// Tipo genérico para respuestas de API
export interface Result<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}

// Interfaz para credenciales de login
export interface ILoginCredentials {
  username: string;
  password: string;
}

// Interfaz para respuesta de login
export interface ILoginResponse {
  access: string;
  refresh: string;
}

// Interfaz para usuario básico
export interface IUser {
  first_name: string;
  last_name: string;
  email?: string;
}

// Interfaz para perfil de usuario completo
export interface IUserProfile {
  user: IUser;
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

// Interfaz para datos de edición de perfil
export interface IEditProfileData {
  user?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  telefono?: string;
  biografia?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  sitio_web?: string;
}

// Interfaz para respuestas genéricas de API
export interface IApiResponse {
  message: string;
  success?: boolean;
  detail?: string;
}
