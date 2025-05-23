import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const MySwal = withReactContent(Swal);

type Ramal = {
    id: number;
    setor: string;
    ramal: string;
};

export function GerenciarRamais() {
    const [ramais, setRamais] = useState<Ramal[]>([]);
    const [perfilLogado, setPerfilLogado] = useState<'C' | 'R' | 'M' | null>(null);

    const [modalCriacaoAberto, setModalCriacaoAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);

    const [novoSetor, setNovoSetor] = useState("");
    const [novoRamal, setNovoRamal] = useState("");

    const [ramalEditando, setRamalEditando] = useState<Ramal | null>(null);
    const [novoSetorEdicao, setNovoSetorEdicao] = useState("");
    const [novoRamalEdicao, setNovoRamalEdicao] = useState("");

    useEffect(() => {
        const perfilSalvo = localStorage.getItem("perfil") as 'C' | 'R' | 'M' | null;
        setPerfilLogado(perfilSalvo);

        fetchRamais();
    }, []);

    async function fetchRamais() {
        try {
            const response = await fetch(`${backendUrl}/api/ramais/`);
            if (!response.ok) throw new Error("Erro ao buscar ramais");
            const data = await response.json();
            setRamais(data);
        } catch (error) {
            console.error("Erro ao carregar ramais:", error);
        }
    }

    async function adicionarRamal() {
        if (!novoSetor.trim() || !novoRamal.trim()) {
            MySwal.fire("Erro", "Todos os campos são obrigatórios.", "error");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/ramais/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setor: novoSetor, ramal: novoRamal }),
            });

            if (response.status === 409) {
                const data = await response.json();
                MySwal.fire("Erro!", data.message || "Esse ramal já está em uso.", "error");
                return;
            }

            if (!response.ok) throw new Error("Erro ao adicionar ramal");

            const novoRamalCriado = await response.json();
            setRamais((prev) => [...prev, novoRamalCriado]);

            setNovoSetor("");
            setNovoRamal("");
            setModalCriacaoAberto(false);

            MySwal.fire("Sucesso!", "Ramal adicionado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao adicionar ramal:", error);
            MySwal.fire("Erro", "Não foi possível adicionar o ramal.", "error");
        }
    }

    async function atualizarRamal() {
        if (!novoSetorEdicao.trim() || !novoRamalEdicao.trim()) {
            MySwal.fire("Erro", "Todos os campos são obrigatórios.", "error");
            return;
        }

        if (
            ramalEditando?.setor === novoSetorEdicao &&
            ramalEditando?.ramal === novoRamalEdicao
        ) {
            MySwal.fire("Erro!", "Altere algum dado para atualizar.", "error");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/ramais/${ramalEditando?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setor: novoSetorEdicao, ramal: novoRamalEdicao }),
            });

            if (response.status === 409) {
                const data = await response.json();
                MySwal.fire("Erro!", data.message || "Esse ramal já está em uso.", "error");
                return;
            }

            if (!response.ok) throw new Error("Erro ao atualizar ramal");

            const atualizado = await response.json();
            setRamais((prev) =>
                prev.map((r) => (r.id === atualizado.id ? atualizado : r))
            );

            setModalEdicaoAberto(false);
            setRamalEditando(null);

            MySwal.fire("Sucesso!", "Ramal atualizado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao atualizar ramal:", error);
            MySwal.fire("Erro", "Não foi possível atualizar o ramal.", "error");
        }
    }

    async function removerRamal(id: number) {
        const confirmacao = await MySwal.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter essa ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (!confirmacao.isConfirmed) return;

        try {
            const response = await fetch(`${backendUrl}/api/ramais/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir ramal");

            setRamais((prev) => prev.filter((r) => r.id !== id));

            MySwal.fire("Sucesso!", "Ramal excluído com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao excluir ramal:", error);
            MySwal.fire("Erro", "Não foi possível excluir o ramal.", "error");
        }
    }

    const abrirModalCriacao = () => setModalCriacaoAberto(true);
    const fecharModalCriacao = () => {
        setModalCriacaoAberto(false);
        setNovoSetor("");
        setNovoRamal("");
    };

    const abrirModalEdicao = (ramal: Ramal) => {
        setRamalEditando(ramal);
        setNovoSetorEdicao(ramal.setor);
        setNovoRamalEdicao(ramal.ramal);
        setModalEdicaoAberto(true);
    };

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-[#c4d2eb77]">
            <Header />

            <div className="relative flex-1 flex items-start justify-center py-6 px-3 md:py-22">
                <div className="p-4 w-full max-w-4xl">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">
                        Gerenciar Ramais
                    </div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <ul className="divide-y divide-gray-300">
                            {ramais.length > 0 ? (
                                ramais.map((r) => (
                                    <li
                                        key={r.id}
                                        className="flex flex-row justify-between gap-2 p-3 items-center"
                                    >
                                        <span className="text-gray-800 break-words max-w-[60%]">
                                            <span className="font-semibold">{r.setor}</span> - {r.ramal}
                                        </span>
                                        {perfilLogado === "M" && (
                                            <div className="flex gap-2">
                                                <button
                                                    className="cursor-pointer w-20 text-sm px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition text-center"
                                                    onClick={() => abrirModalEdicao(r)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="cursor-pointer w-20 text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
                                                    onClick={() => removerRamal(r.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">
                                    Nenhum ramal encontrado.
                                </p>
                            )}
                        </ul>
                    </div>
                </div>

                {perfilLogado === "M" && (
                    <button
                        className="cursor-pointer absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg hover:bg-green-700 transition z-20 flex items-center gap-2"
                        onClick={abrirModalCriacao}
                    >
                        <FaPlus size={14} />
                        Adicionar Ramal
                    </button>
                )}
            </div>

            <Footer />

            {/* Modal para Adicionar */}
            {modalCriacaoAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            adicionarRamal();
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[30%] border border-gray-300"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">
                            Adicionar Ramal
                        </h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                            placeholder="Setor"
                            value={novoSetor}
                            onChange={(e) => setNovoSetor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                            placeholder="Ramal"
                            value={novoRamal}
                            onChange={(e) => setNovoRamal(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={fecharModalCriacao}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-2 bg-[#3D4A7B] text-white rounded hover:bg-[#2b365b]"
                            >
                                Adicionar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal para Editar */}
            {modalEdicaoAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            atualizarRamal();
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[30%] border border-gray-300"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">
                            Editar Ramal
                        </h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                            placeholder="Setor"
                            value={novoSetorEdicao}
                            onChange={(e) => setNovoSetorEdicao(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                            placeholder="Ramal"
                            value={novoRamalEdicao}
                            onChange={(e) => setNovoRamalEdicao(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setModalEdicaoAberto(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-2 bg-[#3D4A7B] text-white rounded hover:bg-[#2b365b]"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
