import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function CadastrarNovaResposta() {
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        causa: "",
        categoria: "",
        resposta: "",
        passos: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log("Dados enviados:", formData);
        alert("Pergunta cadastrada com sucesso!");
        setFormData({
            titulo: "",
            descricao: "",
            causa: "",
            categoria: "",
            resposta: "",
            passos: "",
        });
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded-lg shadow-md w-[450px] text-center flex flex-col gap-3"
                >
                    <h2 className="text-2xl font-bold text-[#3D4A7B]">Cadastrar Nova Resposta</h2>

                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="" className="text-gray-400">Selecione uma categoria</option>
                        <option value="Dúvidas Gerais" className="text-black">Dúvidas Gerais</option>
                        <option value="Erros Comuns" className="text-black">Erros Comuns</option>
                        <option value="Configuração e Acesso" className="text-black">Configuração e Acesso</option>
                    </select>

                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do problema"
                        value={formData.descricao}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="causa"
                        placeholder="Causa do problema"
                        value={formData.causa}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="resposta"
                        placeholder="Resposta padrão"
                        value={formData.resposta}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="passos"
                        placeholder="Passos para resolução"
                        value={formData.passos}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded h-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#3D4A7B] text-white py-2 rounded hover:bg-[#2C3A60] transition"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>

            <div className="pt-11">
                <Footer />
            </div>
        </div>
    );
}
