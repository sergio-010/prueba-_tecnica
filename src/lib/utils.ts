import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Result } from "@/types/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Obtiene el token de acceso del localStorage
 * @returns Promise con el resultado que contiene el token o un error
 */
export async function getToken(): Promise<Result<string>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        ok: false,
        data: null,
        error: "No hay token de acceso disponible"
      };
    }
    
    return {
      ok: true,
      data: token,
      error: null
    };
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return {
      ok: false,
      data: null,
      error: "Error al acceder al almacenamiento local"
    };
  }
}
