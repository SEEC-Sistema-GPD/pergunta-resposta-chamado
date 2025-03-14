import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaTrash, FaPlus } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

export function GerenciarCategorias() {
    const categorias = [
        { id: "1", nome: "Configuração e Acesso" },
        { id: "2", nome: "Dúvidas Gerais" },
        { id: "3", nome: "Erros Comuns" }
    ];

    const [modalAberto, setModalAberto] = useState(false);
    const [novaCategoria, setNovaCategoria] = useState("");

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => {
        setModalAberto(false);
        setNovaCategoria("");
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
            <Header />
            <div className="flex items-center justify-center">
                <div className="p-4 w-[35%]">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Gerenciar Categorias</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <ul>
                            {categorias.map((categoria) => (
                                <li key={categoria.id} className="flex justify-between p-2 border-b">
                                    {categoria.nome}
                                    <div>
                                        <button className="p-1 cursor-pointer"><BsPencilSquare size={18} /></button>
                                        <button className="p-1 cursor-pointer"><FaTrash size={18} color="#df0000" /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <button 
                className="cursor-pointer fixed bottom-16 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
                onClick={abrirModal}
            >
                <FaPlus size={18} />
            </button>
            <Footer />

            {/* Modal */}
            {modalAberto && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[30%] border border-gray-300">
                    <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">Adicionar Categoria</h2>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]" 
                        placeholder="Digite o nome da categoria" 
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={fecharModal}>Cancelar</button>
                        <button className="cursor-pointer px-4 py-2 bg-[#3D4A7B] text-white rounded hover:bg-[#2b365b]">Adicionar</button>
                    </div>
                </div>
            )}
        </div>
    );
}