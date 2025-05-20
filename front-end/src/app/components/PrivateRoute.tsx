import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JSX } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  cpf: string;
  perfil: 'C' | 'R' | 'M';
}

// Acesso para qualquer usuário autenticado
export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  try {
    jwtDecode<TokenPayload>(token); // Apenas valida o token
  } catch {
    localStorage.removeItem("token");
    toast.error("Sessão expirada. Faça login novamente.");
    return <Navigate to="/" replace />;
  }

  return children;
}

// Acesso para administradores restritos e master
export function AdminRestritoRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    if (decodedToken.perfil !== 'R' && decodedToken.perfil !== 'M') {
      toast.error("Acesso negado. Apenas administradores restritos ou master podem acessar.");
      return <Navigate to="/acesso-negado" replace />;
    }
  } catch {
    localStorage.removeItem("token");
    toast.error("Sessão expirada. Faça login novamente.");
    return <Navigate to="/" replace />;
  }

  return children;
}

// Acesso exclusivo para administradores master
export function AdminMasterRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    if (decodedToken.perfil !== 'M') {
      toast.error("Acesso negado. Apenas administradores master podem acessar.");
      return <Navigate to="/acesso-negado" replace />;
    }
  } catch {
    localStorage.removeItem("token");
    toast.error("Sessão expirada. Faça login novamente.");
    return <Navigate to="/" replace />;
  }

  return children;
}
