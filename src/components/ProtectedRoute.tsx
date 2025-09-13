import React from "react";
import { Navigate } from "react-router-dom";
import { getSession, isSessionExpired } from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const session = getSession();

  // sem sessão → redireciona
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // sessão expirada → redireciona
  if (isSessionExpired()) {
    return <Navigate to="/login" replace />;
  }

  // sessão válida → renderiza rota protegida
  return <>{children}</>;
};

export default ProtectedRoute;
