import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JSX } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  cpf: string;
  perfil: 'C' | 'R' | 'M';
}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  return children;
}

export function AdminRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    // Verifica se é administrador (restrito ou master)
    if (decodedToken.perfil !== 'M' && decodedToken.perfil !== 'R') {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      return <Navigate to="/" replace />;
    }

  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return children;
}
