import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaUserCog, FaCommentMedical } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export function HomeAdmin() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:flex-nowrap gap-6 py-6 md:my-60">
                {/* Card - Visualizar Respostas */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs h-48 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between"
                    onClick={() => navigate("/visualizar-resposta-chamado")}
                >
                    <FaMagnifyingGlass className="text-4xl text-[#3D4A7B] mb-2 -scale-x-100" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Visualizar Respostas</h2>
                    <p className="text-gray-600 text-sm">Consulte as respostas cadastradas para suporte dos chamados.</p>
                </div>

                {/* Card - Cadastrar Resposta */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs h-48 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between"
                    onClick={() => navigate("/cadastrar-nova-resposta")}
                >
                    <FaCommentMedical className="text-4xl text-[#3D4A7B] mb-2" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Cadastrar Resposta</h2>
                    <p className="text-gray-600 text-sm">Permite cadastrar uma resposta padrão para os chamados.</p>
                </div>

                {/* Card - Gerenciar Categorias */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs h-48 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between"
                    onClick={() => navigate("/gerenciar-categorias")}
                >
                    <MdCategory className="text-4xl text-[#3D4A7B] mb-2" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Gerenciar Categorias</h2>
                    <p className="text-gray-600 text-sm">Permite adicionar, editar ou remover categorias existentes.</p>
                </div>

                {/* Card - Gerenciar Usuários */}
                <div
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs h-48 text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between"
                    onClick={() => navigate("/gerenciar-usuarios")}
                >
                    <FaUserCog className="text-4xl text-[#3D4A7B] mb-2" />
                    <h2 className="text-xl font-bold text-[#3D4A7B] mb-2">Gerenciar Usuários</h2>
                    <p className="text-gray-600 text-sm">Permite gerenciar os usuários e as suas permissões.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
