import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Result } from "@/types/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Verifica si un JWT ha expirado
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Obtiene el token de acceso del localStorage y lo refresca si es necesario
 * @returns Promise con el resultado que contiene el token o un error
 */
export async function getToken(): Promise<Result<string>> {
  try {
    let token = localStorage.getItem("access_token");

    if (!token) {
      return {
        ok: false,
        data: null,
        error: "No hay token de acceso disponible",
      };
    }

    // Verificar si el token ha expirado
    if (isTokenExpired(token)) {
      console.log("Token expirado, intentando refrescar...");

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        return {
          ok: false,
          data: null,
          error: "Token expirado y no hay refresh token disponible",
        };
      }

      // Intentar refrescar el token
      try {
        const response = await fetch(
          "http://46.202.88.87:8010/usuarios/api/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al refrescar el token");
        }

        const data = await response.json();
        token = data.access;
        if (token) {
          localStorage.setItem("access_token", token);
          console.log("Token refrescado exitosamente");
        } else {
          throw new Error("No se recibió un token válido");
        }
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        return {
          ok: false,
          data: null,
          error: "No se pudo refrescar el token",
        };
      }
    }

    return {
      ok: true,
      data: token,
      error: null,
    };
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return {
      ok: false,
      data: null,
      error: "Error al acceder al almacenamiento local",
    };
  }
}
