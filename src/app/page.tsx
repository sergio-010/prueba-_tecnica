"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import LoginForm from "@/components/LoginForm";
import AuthenticatedApp from "@/components/AuthenticatedApp";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [initialized, setInitialized] = useState(false);
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // Solo verificar una vez al montar
    if (!initialized) {
      checkAuthStatus();
      setInitialized(true);
    }
  }, [initialized, checkAuthStatus]);

  // Mostrar loading inicial solo hasta que se inicialice
  if (!initialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? <AuthenticatedApp /> : <LoginForm />}
    </>
  );
}
