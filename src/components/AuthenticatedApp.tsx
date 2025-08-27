"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import ProfileView from "@/components/ProfileView";
import EditProfileForm from "@/components/EditProfileForm";
import { Loader2 } from "lucide-react";

export default function AuthenticatedApp() {
    const [currentView, setCurrentView] = useState<'profile' | 'edit'>('profile');
    const { user, isLoading, loadUserProfile } = useAuthStore();

    // Mostrar loading mientras se carga
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    // Si no hay usuario, mostrar mensaje de error
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Error al cargar el perfil</p>
                    <button
                        onClick={() => loadUserProfile()}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    const handleEditProfile = () => {
        setCurrentView('edit');
    };

    const handleCancelEdit = () => {
        setCurrentView('profile');
    };

    const handleSaveProfile = () => {
        setCurrentView('profile');
    };

    return (
        <>
            {currentView === 'profile' && (
                <ProfileView onEditProfile={handleEditProfile} />
            )}

            {currentView === 'edit' && (
                <EditProfileForm
                    onCancel={handleCancelEdit}
                    onSave={handleSaveProfile}
                />
            )}
        </>
    );
}