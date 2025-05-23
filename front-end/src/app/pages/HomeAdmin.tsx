import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaUserCog, FaCommentMedical, FaPhoneAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function HomeAdmin() {
    const navigate = useNavigate();
    const perfil = localStorage.getItem("perfil");

    return (
        <div className="flex flex-col min-h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {/* Visualizar Respostas */}
                    <div
                        className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between h-56"
                        onClick={() => navigate("/visualizar-resposta-chamado")}
                    >
                        <FaMagnifyingGlass className="text-6xl text-[#3D4A7B] mb-2 -scale-x-100" />
                        <h2 className="text-xl font-bold text-[#3D4A7B]">Visualizar Respostas</h2>
                        <p className="text-gray-600 text-sm">
                            Consulte as respostas padrões para suporte dos chamados.
                        </p>
                    </div>

                    {/* Cadastrar Resposta */}
                    <div
                        className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between h-56"
                        onClick={() => navigate("/cadastrar-nova-resposta")}
                    >
                        <FaCommentMedical className="text-6xl text-[#3D4A7B] mb-2" />
                        <h2 className="text-xl font-bold text-[#3D4A7B]">Cadastrar Resposta</h2>
                        <p className="text-gray-600 text-sm">
                            Permite cadastrar uma resposta padrão para os chamados.
                        </p>
                    </div>

                    {/* Gerenciar Categorias */}
                    {perfil === "M" && (
                        <div
                            className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between h-56"
                            onClick={() => navigate("/gerenciar-categorias")}
                        >
                            <MdCategory className="text-6xl text-[#3D4A7B] mb-2" />
                            <h2 className="text-xl font-bold text-[#3D4A7B]">Gerenciar Categorias</h2>
                            <p className="text-gray-600 text-sm">
                                Permite gerenciar categorias e suas informações no sistema.
                            </p>
                        </div>
                    )}

                    {/* Gerenciar Usuários */}
                    {perfil === "M" && (
                        <div
                            className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between h-56"
                            onClick={() => navigate("/gerenciar-usuarios")}
                        >
                            <FaUserCog className="text-6xl text-[#3D4A7B] mb-2" />
                            <h2 className="text-xl font-bold text-[#3D4A7B]">Gerenciar Usuários</h2>
                            <p className="text-gray-600 text-sm">
                                Permite gerenciar usuários e suas permissões no sistema.
                            </p>
                        </div>
                    )}

                    {/* Gerenciar ou Visualizar Ramais */}
                    {(perfil === "M" || perfil === "R") && (
                        <div
                            className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition flex flex-col items-center justify-between h-56"
                            onClick={() => navigate("/gerenciar-ramais")}
                        >
                            <FaPhoneAlt className="text-6xl text-[#3D4A7B] mb-2" />
                            <h2 className="text-xl font-bold text-[#3D4A7B]">
                                {perfil === "M" ? "Gerenciar Ramais" : "Visualizar Ramais"}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {perfil === "M"
                                    ? "Permite gerenciar ramais e suas informações no sistema."
                                    : "Consulte os ramais cadastrados e seus respectivos setores no sistema."}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
