"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
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

    const { login, isLoading } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await login(credentials);

            if (success) {
                toast.success("¡Inicio de sesión exitoso!");
            } else {
                toast.error("Error al iniciar sesión. Verifica la conexión a internet y que el servidor esté disponible.");
            }
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            toast.error("Error de conexión. Verifica tu conexión a internet e intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para cargar credenciales de prueba
    const loadTestCredentials = () => {
        setCredentials({
            username: "carlosandresmoreno",
            password: "90122856_Hanz",
        });
        toast.info("Credenciales de prueba cargadas");
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
                    {/* Indicador de modo demo */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
                        <strong>Modo Demo:</strong> Si el servidor no responde, se activará automáticamente el modo demostración con datos de prueba.
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre de usuario"
                                disabled={isSubmitting || isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                disabled={isSubmitting || isLoading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting || isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={loadTestCredentials}
                            disabled={isSubmitting || isLoading}
                        >
                            Cargar Credenciales de Prueba
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}