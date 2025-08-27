"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, X, User, Phone, FileText, Globe, Linkedin, Github } from "lucide-react";

interface EditProfileFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export default function EditProfileForm({ onCancel, onSave }: EditProfileFormProps) {
    const { user, updateProfile } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        user: {
            first_name: "",
            last_name: "",
        },
        telefono: "",
        tipo_usuario: "",
        tipo_naturaleza: "",
        biografia: "",
        documento: "",
        linkedin: "",
        twitter: "",
        github: "",
        sitio_web: "",
        esta_verificado: false,
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        if (user) {
            setFormData({
                user: {
                    first_name: user.user.first_name || "",
                    last_name: user.user.last_name || "",
                },
                telefono: user.telefono || "",
                tipo_usuario: user.tipo_usuario || "",
                tipo_naturaleza: user.tipo_naturaleza || "",
                biografia: user.biografia || "",
                documento: user.documento || "",
                linkedin: user.linkedin || "",
                twitter: user.twitter || "",
                github: user.github || "",
                sitio_web: user.sitio_web || "",
                esta_verificado: user.esta_verificado || false,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'first_name' || name === 'last_name') {
            setFormData(prev => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        if (!formData.user.first_name.trim()) {
            toast.error("El nombre es obligatorio");
            return false;
        }

        if (!formData.user.last_name.trim()) {
            toast.error("El apellido es obligatorio");
            return false;
        }

        // Validar URLs si se proporcionan
        const urlFields = ['linkedin', 'twitter', 'github', 'sitio_web'];
        for (const field of urlFields) {
            const value = formData[field as keyof typeof formData] as string;
            if (value && value.trim() !== '') {
                try {
                    new URL(value);
                } catch {
                    toast.error(`${field} debe ser una URL válida`);
                    return false;
                }
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const success = await updateProfile(formData);

            if (success) {
                toast.success("Perfil actualizado correctamente");
                onSave();
            } else {
                toast.error("Error al actualizar el perfil. Por favor, intenta nuevamente.");
            }
        } catch (error) {
            toast.error("Error al actualizar el perfil");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                    {/* Información Personal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </CardTitle>
                            <CardDescription>
                                Información básica de tu perfil
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">Nombre *</Label>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        value={formData.user.first_name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Apellido *</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        value={formData.user.last_name}
                                        onChange={handleChange}
                                        placeholder="Tu apellido"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telefono">
                                    <Phone className="inline h-4 w-4 mr-1" />
                                    Teléfono
                                </Label>
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Tu número de teléfono"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="documento">
                                    <FileText className="inline h-4 w-4 mr-1" />
                                    Documento de Identidad
                                </Label>
                                <Input
                                    id="documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleChange}
                                    placeholder="Número de documento"
                                    disabled={isSubmitting}
                                />
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
                            <CardDescription>
                                Detalles sobre tu actividad profesional
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tipo_usuario">Tipo de Usuario</Label>
                                <Input
                                    id="tipo_usuario"
                                    name="tipo_usuario"
                                    value={formData.tipo_usuario}
                                    onChange={handleChange}
                                    placeholder="ej: instructor, estudiante"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tipo_naturaleza">Tipo de Naturaleza</Label>
                                <Input
                                    id="tipo_naturaleza"
                                    name="tipo_naturaleza"
                                    value={formData.tipo_naturaleza}
                                    onChange={handleChange}
                                    placeholder="ej: natural, jurídica"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="biografia">Biografía</Label>
                                <Textarea
                                    id="biografia"
                                    name="biografia"
                                    value={formData.biografia}
                                    onChange={handleChange}
                                    placeholder="Cuéntanos sobre ti..."
                                    rows={4}
                                    disabled={isSubmitting}
                                />
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
                                Enlaces a tus perfiles sociales y sitio web (URLs completas)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">
                                        <Linkedin className="inline h-4 w-4 mr-1 text-blue-600" />
                                        LinkedIn
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="https://www.linkedin.com/in/tu-perfil"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="github">
                                        <Github className="inline h-4 w-4 mr-1" />
                                        GitHub
                                    </Label>
                                    <Input
                                        id="github"
                                        name="github"
                                        type="url"
                                        value={formData.github}
                                        onChange={handleChange}
                                        placeholder="https://github.com/tu-usuario"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="twitter">
                                        <svg className="inline h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        Twitter / X
                                    </Label>
                                    <Input
                                        id="twitter"
                                        name="twitter"
                                        type="url"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        placeholder="https://twitter.com/tu-usuario"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sitio_web">
                                        <Globe className="inline h-4 w-4 mr-1" />
                                        Sitio Web
                                    </Label>
                                    <Input
                                        id="sitio_web"
                                        name="sitio_web"
                                        type="url"
                                        value={formData.sitio_web}
                                        onChange={handleChange}
                                        placeholder="https://tu-sitio-web.com"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}