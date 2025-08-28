import { Result, IEditProfileData, IApiResponse } from "@/types/interfaces";
import { getToken } from "@/lib/utils";

const API_BASE = "";

export async function updateProfileAction(
  profileData: IEditProfileData
): Promise<Result<IApiResponse>> {
  try {
    const { data: token, error } = await getToken();

    if (!token && error) {
      throw new Error(error);
    }

    const response = await fetch(`/usuario/perfil`, {
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

    const response = await fetch(`${API_BASE}/perfil/foto`, {
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
