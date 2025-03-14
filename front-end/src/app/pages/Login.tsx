import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// O Login, por ainda não ter acesso aos usuários, está estático ao clicar no botão "Entrar"
export function Login() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/visualizar-resposta-chamado");
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
                        className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
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