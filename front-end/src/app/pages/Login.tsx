import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {jwtDecode, JwtPayload } from "jwt-decode";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Defina uma interface estendendo JwtPayload para incluir o atributo "super"
interface MyTokenPayload extends JwtPayload {
  super: boolean;
}

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "cpf": username,
          "password": password
        })
      });

      console.log(username, password);

      if (!response.ok) {
        throw new Error("Falha no login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Decodifique o token utilizando a interface MyTokenPayload
      const decodedUser = jwtDecode<MyTokenPayload>(data.token);

      if (decodedUser.super) {
        navigate("/home-admin");
      } else {
        navigate("/visualizar-resposta-chamado");
      }
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
      <Header />
      <div className="flex m-[10%] items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
          <h1 className="text-2xl font-bold text-[#3D4A7B] mb-4">Login</h1>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#3D4A7B] text-white py-2 rounded hover:bg-[#2C3A60] transition"
          >
            Entrar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
