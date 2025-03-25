import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Swal from "sweetalert2";
import { Footer } from '../components/Footer';
import { FaEye, FaEyeSlash, } from "react-icons/fa";
import minhaImagem from '../../assets/brasao-seec.png';

// Interface do token
interface MyTokenPayload extends JwtPayload {
  super: boolean;
}

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Por favor, preencha os campos de usuário e senha.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "cpf": username,
          "password": password
        })
      });

      const data = await response.json();
      localStorage.setItem("token", data.token); // Salva o token no localStorage
      localStorage.setItem("displayName", data.displayName); // Salva o nome no localStorage


      const decodedUser = jwtDecode<MyTokenPayload>(data.token);
      const nomeUsuarioCompleto = data.displayName;
      const primeiroNomeUsuario = nomeUsuarioCompleto.split(" ")[0]; // Pega só o primeiro nome do usuário

      Swal.fire({
        icon: "info",
        title: "Logando...",
        text: "Aguarde enquanto você é redirecionado.",
        showConfirmButton: false,
        timer: 2000,
        willClose: () => {
          // ✅ Exibe o toast no canto inferior direito
          Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "success",
            title: `Seja bem-vindo, ${primeiroNomeUsuario}.`,
            text: "Que bom ter você aqui!",
            showConfirmButton: false,
            timer: 4000,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          // Redirecionamento após login
          if (decodedUser.super) {
            navigate("/home-admin");
          } else {
            navigate("/visualizar-resposta-chamado");
          }
        }
      });

    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Usuário ou senha incorretos. Verifique suas credenciais e tente novamente.",
      });
    }
  }
  return (
    <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
      <Header />
      
      <div className="flex m-[10%] items-center justify-center">
      <div className="w-160">
          <img src={minhaImagem} alt="Logo" className="w-200 mx-auto" />
      </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
          <h1 className="text-2xl font-bold text-[#3D4A7B] mb-4">Login</h1>

          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="cursor-pointer w-full bg-[#3D4A7B] text-white py-2 rounded hover:bg-[#2C3A60] transition"
          >
            Entrar
          </button>
          <p className="mt-4 text-sm text-gray-400"> As credenciais utilizadas são as mesmas do <strong> login local da SEEC </strong> (LDAP)</p>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}
