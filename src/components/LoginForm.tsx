"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { loadUserProfile, setLoading, isLoading } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoading(true);

        try {
            const result = await loginAction(credentials);

            if (result.ok && result.data) {
                toast.success("¡Inicio de sesión exitoso!");

                // Cargar el perfil después del login exitoso
                await loadUserProfile();
                toast.success("Perfil cargado correctamente");
            } else {
                toast.error(result.error || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error inesperado durante el inicio de sesión");
        } finally {
            setIsSubmitting(false);
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Iniciar Sesión
                    </CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus credenciales para acceder a tu perfil
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={credentials.username}
                                onChange={handleInputChange}
                                placeholder="Ingresa tu usuario"
                                required
                                disabled={isSubmitting || isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Ingresa tu contraseña"
                                required
                                disabled={isSubmitting || isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting || isLoading ? "Iniciando..." : "Iniciar Sesión"}
                        </Button>

                        {/* Credenciales válidas según documentación */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full text-sm"
                            onClick={() => {
                                setCredentials({
                                    username: "carlosandresmoreno",
                                    password: "90122856_Hanz"
                                });
                                toast.info("Credenciales válidas cargadas");
                            }}
                            disabled={isSubmitting || isLoading}
                        >
                            📋 Usar Credenciales de la Documentación
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
