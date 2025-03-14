import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaRegCommentDots } from "react-icons/fa"; // Ícone para "Cadastrar nova resposta"
import { MdCategory } from "react-icons/md"; // Ícone para "Gerenciar Categorias"

export function HomeAdmin() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex m-[12%] items-center justify-center gap-6 flex-wrap">
                {/* Card - Cadastrar Nova Resposta */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-80 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center"
                    onClick={() => navigate("/cadastrar-nova-resposta")}
                >
                    <FaRegCommentDots className="text-4xl text-[#3D4A7B] mb-2" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Cadastrar Nova Resposta</h2>
                    <p className="text-gray-600">Permite cadastrar uma nova resposta para os chamados.</p>
                </div>

                {/* Card - Gerenciar Categorias */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-80 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center"
                    onClick={() => navigate("/gerenciar-categorias")}
                >
                    <MdCategory className="text-4xl text-[#3D4A7B] mb-2" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Gerenciar Categorias</h2>
                    <p className="text-gray-600">Permite adicionar, editar ou remover categorias existentes.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}