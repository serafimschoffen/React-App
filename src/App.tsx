import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * Componente principal da aplicação
 * Responsável por definir as rotas e controlar o acesso
 */
const App: React.FC = () => (
  // BrowserRouter envolve toda a aplicação e habilita o roteamento
  <BrowserRouter>
    <Routes>
      {/* Rota pública de login */}
      <Route path="/login" element={<Login />} />

      {/* Rota protegida do dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {" "}
            {/* Verifica sessão antes de renderizar */}
            <Dashboard /> {/* Componente que mostra a lista de usuários */}
          </ProtectedRoute>
        }
      />

      {/* Rota protegida para detalhes de um usuário específico */}
      <Route
        path="/dashboard/users/:id"
        element={
          <ProtectedRoute>
            <UserDetails /> {/* Componente que mostra detalhes do usuário */}
          </ProtectedRoute>
        }
      />

      {/* Rota coringa: qualquer caminho não definido redireciona para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
