import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function CadastrarNovaResposta() {
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        causa: "",
        categoria_id: "",
        resposta: "",
        passos: "",
    });

    const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await fetch("http://localhost:3000/api/categoria"); 
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategorias();
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: name === "categoria_id" ? Number(value) : value }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const confirmResult = await Swal.fire({
            title: "Tem certeza disso?",
            text: "Deseja realmente cadastrar essa nova resposta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cadastrar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const response = await fetch("http://localhost:3000/api/respostas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await Swal.fire("Sucesso!", "Resposta cadastrada com sucesso!", "success");
                setFormData({
                    titulo: "",
                    descricao: "",
                    causa: "",
                    categoria_id: "",
                    resposta: "",
                    passos: "",
                });
            } else {
                throw new Error("Erro ao cadastrar resposta");
            }
        } catch (error) {
            console.error("Erro ao cadastrar resposta:", error);
            Swal.fire("Erro!", "Ocorreu um erro ao cadastrar a resposta.", "error");
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded-lg shadow-md w-[50%] text-center flex flex-col gap-3"
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
                        name="categoria_id"
                        value={formData.categoria_id}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${formData.categoria_id ? "text-black" : "text-gray-500"
                            }`}
                        required
                    >
                        <option value="" disabled hidden>Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do problema"
                        value={formData.descricao}
                        onChange={handleChange}
                        className="text-black w-full p-2 border border-gray-300 rounded h-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="causa"
                        placeholder="Causa do problema"
                        value={formData.causa}
                        onChange={handleChange}
                        className="text-black w-full p-2 border border-gray-300 rounded h-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="resposta"
                        placeholder="Resposta padrão"
                        value={formData.resposta}
                        onChange={handleChange}
                        className="text-black w-full p-2 border border-gray-300 rounded h-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="passos"
                        placeholder="Passos para resolução"
                        value={formData.passos}
                        onChange={handleChange}
                        className="text-black w-full p-2 border border-gray-300 rounded h-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
