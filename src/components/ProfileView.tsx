"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    User,
    Phone,
    Mail,
    FileText,
    Globe,
    Github,
    Linkedin,
    Edit,
    Upload,
    LogOut,
    ExternalLink,
    CheckCircle,
    XCircle
} from "lucide-react";

interface ProfileViewProps {
    onEditProfile: () => void;
}

export default function ProfileView({ onEditProfile }: ProfileViewProps) {
    const [isUploading, setIsUploading] = useState(false);
    const { user, logout, uploadPhoto } = useAuthStore();

    if (!user) {
        return null;
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            toast.error("Por favor selecciona un archivo de imagen válido");
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("La imagen no puede superar los 5MB");
            return;
        }

        setIsUploading(true);
        try {
            const success = await uploadPhoto(file);
            if (success) {
                toast.success("Foto de perfil actualizada correctamente");
            } else {
                toast.error("Error al subir la foto. Por favor, intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Error al subir la foto");
        } finally {
            setIsUploading(false);
            // Limpiar el input
            e.target.value = '';
        }
    };

    const handleLogout = () => {
        logout();
        toast.success("Sesión cerrada correctamente");
    };

    const openLink = (url: string) => {
        if (url && url !== '') {
            window.open(url, '_blank');
        }
    };

    // Generar iniciales para el avatar
    const getInitials = () => {
        const firstName = user.user.first_name || '';
        const lastName = user.user.last_name || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header con botones de acción */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
                    <div className="flex gap-2">
                        <Button onClick={onEditProfile} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Editar Perfil
                        </Button>
                        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Información Personal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar y foto */}
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={user.foto}
                                        alt={`${user.user.first_name} ${user.user.last_name}`}
                                    />
                                    <AvatarFallback className="text-lg">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col items-center gap-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        id="photo-upload"
                                        disabled={isUploading}
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => document.getElementById('photo-upload')?.click()}
                                        disabled={isUploading}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        {isUploading ? "Subiendo..." : "Cambiar Foto"}
                                    </Button>
                                </div>
                            </div>

                            {/* Información básica */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                                    <p className="text-lg font-medium">{user.user.first_name} {user.user.last_name}</p>
                                </div>

                                {user.user.email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {user.user.email}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Teléfono</label>
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {user.telefono || 'No especificado'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Documento</label>
                                    <p>{user.documento || 'No especificado'}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Estado de Verificación</label>
                                    <div className="flex items-center gap-2">
                                        {user.esta_verificado ? (
                                            <>
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <Badge variant="default" className="bg-green-100 text-green-800">
                                                    Verificado
                                                </Badge>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-4 w-4 text-red-500" />
                                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                                    No Verificado
                                                </Badge>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información Profesional */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Información Profesional
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tipo de Usuario</label>
                                <Badge variant="outline" className="mt-1">
                                    {user.tipo_usuario}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Tipo de Naturaleza</label>
                                <Badge variant="outline" className="mt-1">
                                    {user.tipo_naturaleza}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Biografía</label>
                                <p className="text-gray-700 mt-1">
                                    {user.biografia || 'No hay biografía disponible'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Redes Sociales */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Redes Sociales y Enlaces
                            </CardTitle>
                            <CardDescription>
                                Enlaces a perfiles sociales y sitio web
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {/* LinkedIn */}
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Linkedin className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium">LinkedIn</span>
                                    </div>
                                    {user.linkedin && user.linkedin !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.linkedin)}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-gray-400">No configurado</span>
                                    )}
                                </div>

                                {/* GitHub */}
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        <span className="font-medium">GitHub</span>
                                    </div>
                                    {user.github && user.github !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.github)}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-gray-400">No configurado</span>
                                    )}
                                </div>

                                {/* Twitter */}
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        <span className="font-medium">Twitter</span>
                                    </div>
                                    {user.twitter && user.twitter !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.twitter)}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-gray-400">No configurado</span>
                                    )}
                                </div>

                                {/* Sitio Web */}
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-5 w-5" />
                                        <span className="font-medium">Sitio Web</span>
                                    </div>
                                    {user.sitio_web && user.sitio_web !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.sitio_web)}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-gray-400">No configurado</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}