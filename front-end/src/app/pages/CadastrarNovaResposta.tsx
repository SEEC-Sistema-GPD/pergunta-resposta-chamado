import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function CadastrarNovaResposta() {
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        causa: "",
        categoria_id: "",
        resposta: "",
        passos: "",
    });

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);
    const descricaoRef = useRef<HTMLTextAreaElement | null>(null);
    const causaRef = useRef<HTMLTextAreaElement | null>(null);
    const respostaRef = useRef<HTMLTextAreaElement | null>(null);
    const passosRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await fetch(`${backendUrl}/api/categoria`);
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "categoria_id" ? Number(value) : value,
        }));
    }

    function autoResizeTextarea(el: HTMLTextAreaElement | null) {
        if (el) {
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const confirmResult = await Swal.fire({
            title: "Tem certeza disso?",
            text: "Você cadastrará uma nova resposta.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cadastrar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmResult.isConfirmed) return;

        try {
            const response = await fetch(`${backendUrl}/api/respostas`, {
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

                [descricaoRef, causaRef, respostaRef, passosRef].forEach(ref => {
                    if (ref.current) {
                        ref.current.style.height = "auto";
                    }
                });

                await Swal.fire({
                    title: "Teleportando...",
                    text: "Aguarde enquanto você é redirecionado.",
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    willClose: () => {
                        navigate("/visualizar-resposta-chamado");
                    },
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
        <div className="flex flex-col min-h-screen w-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex items-center justify-center py-22 px-7 md:py-26">
                <div className="w-full max-w-4xl">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Cadastrar Resposta</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
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
                                className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${formData.categoria_id ? "text-black" : "text-gray-500"}`}
                                required
                            >
                                <option value="" disabled hidden>Selecione uma categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>

                            <textarea
                                ref={descricaoRef}
                                name="descricao"
                                placeholder="Descrição do problema"
                                value={formData.descricao}
                                onChange={handleChange}
                                onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                rows={1}
                                className="text-black w-full p-2 border border-gray-300 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <textarea
                                ref={causaRef}
                                name="causa"
                                placeholder="Causa do problema"
                                value={formData.causa}
                                onChange={handleChange}
                                onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                rows={1}
                                className="text-black w-full p-2 border border-gray-300 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <textarea
                                ref={respostaRef}
                                name="resposta"
                                placeholder="Resposta padrão"
                                value={formData.resposta}
                                onChange={handleChange}
                                onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                rows={1}
                                className="text-black w-full p-2 border border-gray-300 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <textarea
                                ref={passosRef}
                                name="passos"
                                placeholder="Passos para resolução"
                                value={formData.passos}
                                onChange={handleChange}
                                onInput={(e) => autoResizeTextarea(e.currentTarget)}
                                rows={1}
                                className="text-black w-full p-2 border border-gray-300 rounded resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-[#3D4A7B] text-white py-2 rounded hover:bg-[#2C3A60] transition"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
