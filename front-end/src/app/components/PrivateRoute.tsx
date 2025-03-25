import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JSX } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  super: boolean;
}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" />;
  }

  return children;
}

export function AdminRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode<TokenPayload>(token);

    // Verificar se o usuário é administrador
    if (!decodedToken.super) {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      return <Navigate to="/" />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  return children;
}

