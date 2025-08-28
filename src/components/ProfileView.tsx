"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { uploadPhotoAction } from "@/actions/profile";
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
    XCircle,
    Briefcase,
    GraduationCap,
    Star,
    Award
} from "lucide-react";

interface ProfileViewProps {
    onEditProfile: () => void;
}

export default function ProfileView({ onEditProfile }: ProfileViewProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [openingLink, setOpeningLink] = useState<string | null>(null);
    const { user, logout, loadUserProfile } = useAuthStore();

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
            const formData = new FormData();
            formData.append('foto', file);

            const result = await uploadPhotoAction(formData);

            if (result.ok) {
                toast.success("Foto de perfil actualizada correctamente");
                await loadUserProfile(); // Actualizar el perfil después de subir la foto
            } else {
                toast.error(result.error || "Error al subir la foto. Por favor, intenta nuevamente.");
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

    const openLink = async (url: string, platform?: string) => {
        if (!url || url.trim() === '') return;

        setOpeningLink(url);

        let formattedUrl = url.trim();

        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            formattedUrl = `https://${formattedUrl}`;
        }

        try {
            new URL(formattedUrl);
            window.open(formattedUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            // Error silencioso
        } finally {
            setTimeout(() => setOpeningLink(null), 500);
        }
    };

    const getImageUrl = (relativeUrl: string | null | undefined) => {
        if (!relativeUrl || relativeUrl.trim() === '') return "";

        const cleanUrl = relativeUrl.trim();

        if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
            return cleanUrl;
        }

        const baseUrl = 'http://46.202.88.87:8010';
        const url = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;

        return `${baseUrl}${url}`;
    };

    const getInitials = () => {
        if (!user || !user.basic_info) return '';
        const firstName = user.basic_info.first_name || '';
        const lastName = user.basic_info.last_name || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Validación para mostrar estado de carga o error
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="p-8 text-center">
                            <p className="text-gray-500">Cargando perfil de usuario...</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!user.basic_info) {
        console.error("Datos de usuario recibidos:", user);
        console.error("Estructura del usuario:", JSON.stringify(user, null, 2));

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="p-8 text-center">
                            <p className="text-red-500">Error: Datos de usuario incompletos</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Falta la propiedad basic_info en el perfil del usuario
                            </p>
                            <Button onClick={() => loadUserProfile()} className="mt-4 mr-2">
                                Recargar Perfil
                            </Button>
                            <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
                                Recargar página
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header con botones de acción */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
                    <div className="flex gap-3">
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

                {/* Grid principal de cards */}
                <div className="grid gap-8 md:grid-cols-2">

                    {/* Información Personal */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar y foto */}
                            <div className="flex flex-col items-center space-y-6">
                                <Avatar className="h-28 w-28">
                                    <AvatarImage
                                        src={getImageUrl(user.basic_info.foto)}
                                        alt={`${user.basic_info?.first_name || ''} ${user.basic_info?.last_name || ''}`}
                                    />
                                    <AvatarFallback className="text-xl">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Controles de foto */}
                                <div className="flex flex-col items-center gap-3">
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
                                        {isUploading ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                                Subiendo...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4" />
                                                Cambiar Foto
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Información básica */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                                    <p className="text-lg font-medium">{user.basic_info.first_name} {user.basic_info.last_name}</p>
                                </div>

                                {user.basic_info.email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {user.basic_info.email}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Teléfono</label>
                                    <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        {user.basic_info.telefono || 'No especificado'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Documento</label>
                                    <p>{user.basic_info.documento || 'No especificado'}</p>
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
                                <label className="text-sm font-medium text-gray-500">Biografía</label>
                                <p className="text-gray-700 mt-1">
                                    {user.basic_info.biografia || 'No hay biografía disponible'}
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
                                    {user.basic_info.redes_sociales.linkedin && user.basic_info.redes_sociales.linkedin !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.basic_info.redes_sociales.linkedin, 'LinkedIn')}
                                            disabled={openingLink === user.basic_info.redes_sociales.linkedin}
                                        >
                                            {openingLink === user.basic_info.redes_sociales.linkedin ? (
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
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
                                    {user.basic_info.redes_sociales.github && user.basic_info.redes_sociales.github !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.basic_info.redes_sociales.github, 'GitHub')}
                                            disabled={openingLink === user.basic_info.redes_sociales.github}
                                        >
                                            {openingLink === user.basic_info.redes_sociales.github ? (
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
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
                                    {user.basic_info.redes_sociales.twitter && user.basic_info.redes_sociales.twitter !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.basic_info.redes_sociales.twitter, 'Twitter')}
                                            disabled={openingLink === user.basic_info.redes_sociales.twitter}
                                        >
                                            {openingLink === user.basic_info.redes_sociales.twitter ? (
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
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
                                    {user.basic_info.redes_sociales.sitio_web && user.basic_info.redes_sociales.sitio_web !== '' ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openLink(user.basic_info.redes_sociales.sitio_web, 'Sitio Web')}
                                            disabled={openingLink === user.basic_info.redes_sociales.sitio_web}
                                        >
                                            {openingLink === user.basic_info.redes_sociales.sitio_web ? (
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
                                        </Button>
                                    ) : (
                                        <span className="text-sm text-gray-400">No configurado</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Experiencia Laboral */}
                {user.experiencia_laboral && user.experiencia_laboral.length > 0 && (
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Experiencia Laboral
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {user.experiencia_laboral.map((exp) => (
                                    <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg">{exp.posicion}</h3>
                                                <p className="text-blue-600 font-medium">{exp.empresa}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">
                                                    {exp.fecha_inicio} - {exp.actualmente ? 'Actual' : exp.fecha_fin}
                                                </p>
                                                {exp.actualmente && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                        Trabajando actualmente
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-3 whitespace-pre-line">{exp.funciones}</p>
                                        {exp.habilidades && exp.habilidades.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {exp.habilidades.map((hab) => (
                                                    <span
                                                        key={hab.id}
                                                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                                    >
                                                        {hab.nombre}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Educación */}
                {user.educacion && user.educacion.length > 0 && (
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Educación
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {user.educacion.map((edu) => (
                                    <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{edu.titulo}</h3>
                                                <p className="text-green-600 font-medium">{edu.institucion}</p>
                                                {edu.campo_estudio && (
                                                    <p className="text-gray-600">{edu.campo_estudio}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">
                                                    {edu.fecha_inicio} - {edu.fecha_fin}
                                                </p>
                                                {edu.completado && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                        Completado
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Habilidades */}
                {user.habilidades && user.habilidades.length > 0 && (
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5" />
                                Habilidades
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.habilidades.map((hab) => (
                                    <div key={hab.id} className="p-3 border rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium">{hab.habilidad__nombre}</h3>
                                            {hab.esta_verificado && (
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    Verificado
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {hab.tiempo_experiencia} años de experiencia
                                        </p>
                                        {hab.empresa_adquisicion && (
                                            <p className="text-xs text-gray-500">
                                                Adquirido en: {hab.empresa_adquisicion}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Portafolio */}
                {user.portafolio && user.portafolio.length > 0 && (
                    <Card className="col-span-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Portafolio
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.portafolio.map((item) => (
                                    <div key={item.id} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium">{item.titulo}</h3>
                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                                {item.tipo}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">{item.descripcion}</p>
                                        <p className="text-xs text-gray-500 mb-2">Fecha: {item.fecha}</p>
                                        {item.url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openLink(item.url!)}
                                                className="flex items-center gap-1"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Ver más
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}