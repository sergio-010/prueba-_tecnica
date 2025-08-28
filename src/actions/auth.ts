"use client";

import { getToken } from "@/lib/utils";
import {
  Result,
  ILoginCredentials,
  ILoginResponse,
  IUserProfile,
  IEditProfileData,
  IApiResponse,
} from "@/types/interfaces";

const API_BASE = "";

export async function refreshTokenAction(): Promise<
  Result<{ access: string }>
> {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No hay refresh token disponible");
    }

    const response = await fetch(`/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Error al refrescar el token");
    }

    const data = await response.json();

    // Actualizar el access token en localStorage
    localStorage.setItem("access_token", data.access);

    return { ok: true, data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al refrescar el token";
    return { ok: false, data: null, error: errorMessage };
  }
}

export async function loginAction(
  credentials: ILoginCredentials
): Promise<Result<ILoginResponse>> {
  try {
    const response = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: ILoginResponse = await response.json();

    localStorage.setItem("access_token", data.data.access);
    localStorage.setItem("refresh_token", data.data.refresh);
    localStorage.setItem("user_id", data.data.user_id.toString());
    localStorage.setItem("user_role", data.data.rol);

    return { ok: true, data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido durante el login";
    return { ok: false, data: null, error: errorMessage };
  }
}

export async function getProfileAction(): Promise<Result<IUserProfile>> {
  try {
    const { data: token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(`/perfil`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Token expirado o inválido");
      }
      const errorMessage = await response.text();
      console.error(
        `Error al obtener perfil: ${response.status} - ${errorMessage}`
      );
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: IUserProfile = await response.json();
    console.log("Perfil obtenido exitosamente");

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener el perfil";
    return { ok: false, data: null, error: errorMessage };
  }
}

export async function updateProfileAction(
  profileData: IEditProfileData
): Promise<Result<IApiResponse>> {
  try {
    const { data: token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(`${API_BASE}/usuario/perfil/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Token expirado o inválido");
      }
      const errorMessage = await response.text();
      console.error(
        `Error al actualizar perfil: ${response.status} - ${errorMessage}`
      );
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: IApiResponse = await response.json();
    console.log("Perfil actualizado exitosamente:", data);

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al actualizar el perfil";
    return { ok: false, data: null, error: errorMessage };
  }
}

export async function uploadPhotoAction(
  formData: FormData
): Promise<Result<IApiResponse>> {
  try {
    const { data: token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(`${API_BASE}/perfil/foto/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        // No incluir Content-Type para multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Token expirado o inválido");
      }
      const errorMessage = await response.text();
      console.error(
        `Error al subir foto: ${response.status} - ${errorMessage}`
      );
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data: IApiResponse = await response.json();
    console.log("Foto subida exitosamente:", data);

    return { ok: true, data, error: null };
  } catch (error) {
    console.error("Error al subir la foto:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al subir la foto";
    return { ok: false, data: null, error: errorMessage };
  }
}
