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
  data: {
    access: string;
    refresh: string;
    requires_2fa: boolean;
    rol: string;
    user_id: number;
  };
  message: string;
  status: string;
}

// Interfaz para usuario básico
export interface IUser {
  first_name: string;
  last_name: string;
  email?: string;
}

// Interfaz para información básica del perfil (estructura real de la API)
export interface IBasicInfo {
  biografia: string;
  documento: string;
  email: string;
  first_name: string;
  foto: string;
  id_usuario: number;
  last_name: string;
  redes_sociales: {
    github: string;
    linkedin: string;
    sitio_web: string;
    twitter: string;
  };
  telefono: string;
  username: string;
}

// Interfaz para educación
export interface IEducacion {
  campo_estudio: string;
  completado: boolean;
  fecha_fin: string;
  fecha_inicio: string;
  id: number;
  institucion: string;
  titulo: string;
  usuario_id: number;
}

// Interfaz para habilidades en experiencia laboral
export interface IHabilidadExperiencia {
  id: number;
  nombre: string;
}

// Interfaz para experiencia laboral
export interface IExperienciaLaboral {
  actualmente: boolean;
  empresa: string;
  fecha_fin: string | null;
  fecha_inicio: string;
  funciones: string;
  habilidades: IHabilidadExperiencia[];
  id: number;
  posicion: string;
}

// Interfaz para habilidades del perfil
export interface IHabilidad {
  empresa_adquisicion: string;
  esta_verificado: boolean;
  habilidad__nombre: string;
  habilidad_id: number;
  id: number;
  tiempo_experiencia: number;
}

// Interfaz para portafolio
export interface IPortafolio {
  archivo: string;
  descripcion: string;
  fecha: string;
  id: number;
  imagen: string;
  tipo: string;
  titulo: string;
  url: string | null;
  usuario_id: number;
}

// Interfaz para perfil de usuario completo (estructura real de la API)
export interface IUserProfile {
  basic_info: IBasicInfo;
  cursos_impartidos: unknown[];
  educacion: IEducacion[];
  esta_verificado: boolean;
  experiencia_laboral: IExperienciaLaboral[];
  habilidades: IHabilidad[];
  portafolio: IPortafolio[];
  tipo_usuario: string;
}

// Interfaz para respuesta del perfil (estructura real de la API)
export interface IProfileResponse {
  data: IUserProfile;
  message: string;
  status: string;
}

// Interfaz para datos de edición de perfil (estructura esperada por la API)
export interface IEditProfileData {
  user: {
    first_name: string;
    last_name: string;
  };
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
}

// Interfaz para respuestas genéricas de API
export interface IApiResponse {
  message: string;
  success?: boolean;
  detail?: string;
}
