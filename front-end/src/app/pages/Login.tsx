import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { Footer } from '../components/Footer';
import minhaImagem from '../../assets/brasao-seec.png';

// Interface do token
interface MyTokenPayload extends JwtPayload {
  id: string;
  cpf: string;
  perfil: 'C' | 'R' | 'M';
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "cpf": username, "password": password })
      });

      const data = await response.json();

      // Salva token e nome
      localStorage.setItem("token", data.token);
      localStorage.setItem("displayName", data.displayName);
      // Decodifica token e salva ID e perfil
      const decodedUser = jwtDecode<MyTokenPayload>(data.token);
      localStorage.setItem("userId", decodedUser.id);
      localStorage.setItem("perfil", decodedUser.perfil);

      const nomeUsuarioCompleto = data.displayName;
      const primeiroNomeUsuario = nomeUsuarioCompleto.split(" ")[0];

      Swal.fire({
        icon: "info",
        title: "Logando...",
        text: "Aguarde enquanto você é redirecionado.",
        showConfirmButton: false,
        timer: 2000,
        willClose: () => {
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

          switch (decodedUser.perfil) {
            case 'M':
            case 'R':
              navigate("/home-admin"); // ambos acessam a área administrativa
              break;
            case 'C':
            default:
              navigate("/visualizar-resposta-chamado");
              break;
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
    <div className="flex flex-col min-h-screen w-screen bg-[#c4d2eb77]">

      <header className="w-full bg-[#3D4A7B] text-white flex flex-col">
        <div className="flex justify-between items-center p-2 border-b-4 border-[#D99C44]">
          <h1 className="text-lg font-medium flex-1 text-center">
            SEEC - SIGEduc - Sistema Integrado de Gestão da Educação
          </h1>
        </div>
        <div className="p-2 bg-[#C4D2EB] flex-1 text-center items-center">
          <p className="text-primary">
            Perguntas Frequentes para a Equipe de Suporte da SEEC - SIGEduc
          </p>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="flex justify-center">
              <img src={minhaImagem} alt="Logo" className="max-w-[350px] h-auto" />
            </div>

            <div className="flex items-center border border-gray-300 rounded mb-2 px-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded mb-4 px-2 relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 mr-2 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#3D4A7B] text-white py-2 rounded hover:bg-[#2C3A60] transition"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            As credenciais utilizadas são as mesmas do <strong>login local da SEEC</strong> (LDAP).
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}