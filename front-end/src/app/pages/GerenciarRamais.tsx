import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BarraDePesquisa } from "../components/BarraDePesquisa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const MySwal = withReactContent(Swal);

type Ramal = {
    id: number;
    setor: string;
    ramal: string;
};

export function GerenciarRamais() {
    // Estados principais
    const [ramais, setRamais] = useState<Ramal[]>([]);
    const [modalCriacaoAberto, setModalCriacaoAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
    const [ramalEditando, setRamalEditando] = useState<Ramal | null>(null);

    const [setor, setSetor] = useState("");
    const [ramal, setRamal] = useState("");

    const [novoSetor, setNovoSetor] = useState("");
    const [novoRamal, setNovoRamal] = useState("");

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [itensPorPagina, setItensPorPagina] = useState(10); // Quantidade de itens por página

    useEffect(() => {
        carregarRamais(); // Carrega ramais na inicialização
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Sempre volta pra página 1 ao buscar
    }, [search]);

    async function carregarRamais() {
        try {
            const response = await fetch(`${backendUrl}/api/ramais/`);
            if (!response.ok) throw new Error("Erro ao buscar ramais");
            const data = await response.json();
            setRamais(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao carregar ramais:", error);
        }
    }

    // Filtro aplicado sobre a lista de ramais
    const ramaisFiltrados = ramais.filter((r) =>
        r.setor.toLowerCase().includes(search.toLowerCase()) ||
        r.ramal.toLowerCase().includes(search.toLowerCase())
    );

    // Cálculo do total de páginas
    const totalPaginas =
        itensPorPagina === -1
            ? 1
            : Math.max(Math.ceil(ramaisFiltrados.length / itensPorPagina), 1);

    // Índices dos itens na página atual
    const indexUltimoItem = currentPage * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;

    // Itens que serão exibidos na página atual
    const itensExibidos =
        itensPorPagina === -1
            ? ramaisFiltrados
            : ramaisFiltrados.slice(indexPrimeiroItem, indexUltimoItem);

    // Altera quantidade de itens por página
    const handleChangeItensPorPagina = (value: number) => {
        setItensPorPagina(value);
        setCurrentPage(1);
    };

    async function adicionarRamal() {
        if (!setor.trim() || !ramal.trim()) {
            MySwal.fire("Erro", "Preencha todos os campos.", "error");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/ramais/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setor, ramal }),
            });

            if (response.status === 409) {
                const data = await response.json();
                MySwal.fire("Erro!", data.message || "Esse número de ramal já está cadastrado.", "error");
                return;
            }

            if (!response.ok) throw new Error("Erro ao adicionar ramal");

            await carregarRamais();
            setSetor("");
            setRamal("");
            setModalCriacaoAberto(false);
            MySwal.fire("Sucesso!", "O ramal foi adicionado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao adicionar ramal:", error);
            MySwal.fire("Erro!", "Não foi possível adicionar o ramal.", "error");
        }
    }

    async function atualizarRamal() {
        if (!novoSetor.trim() || !novoRamal.trim()) {
            MySwal.fire("Erro!", "Preencha todos os campos.", "error");
            return;
        }

        if (
            ramalEditando?.setor.trim().toLowerCase() === novoSetor.trim().toLowerCase() &&
            ramalEditando?.ramal.trim().toLowerCase() === novoRamal.trim().toLowerCase()
        ) {
            MySwal.fire("Erro!", "Altere algum dado antes de salvar.", "error");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/ramais/${ramalEditando?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setor: novoSetor, ramal: novoRamal }),
            });

            if (response.status === 409) {
                const data = await response.json();
                MySwal.fire("Erro!", data.message || "Esse número de ramal já está cadastrado.", "error");
                return;
            }

            if (!response.ok) throw new Error("Erro ao atualizar ramal");

            await carregarRamais();
            setModalEdicaoAberto(false);
            setRamalEditando(null);
            MySwal.fire("Sucesso!", "Ramal atualizado com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao atualizar ramal:", error);
            MySwal.fire("Erro!", "Não foi possível atualizar o ramal.", "error");
        }
    }

    async function removerRamal(id: number) {
        const confirmacao = await MySwal.fire({
            title: "Tem certeza disso?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
        });

        if (!confirmacao.isConfirmed) return;

        try {
            const response = await fetch(`${backendUrl}/api/ramais/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir ramal");

            await carregarRamais();
            MySwal.fire("Sucesso!", "O ramal foi excluído com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao excluir ramal:", error);
            MySwal.fire("Erro!", "Não foi possível excluir o ramal.", "error");
        }
    }

    const abrirModalCriacao = () => setModalCriacaoAberto(true);
    const fecharModalCriacao = () => {
        setModalCriacaoAberto(false);
        setSetor("");
        setRamal("");
    };

    const abrirModalEdicao = (ramal: Ramal) => {
        setRamalEditando(ramal);
        setNovoSetor(ramal.setor);
        setNovoRamal(ramal.ramal);
        setModalEdicaoAberto(true);
    };

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-[#c4d2eb77]">
            <Header />

            <div className="flex flex-col md:flex-row md:justify-center items-center gap-3 px-3 mt-8">
                <div className="w-full md:w-[400px]">
                    <BarraDePesquisa
                        value={search}
                        onChange={setSearch}
                        placeholder="Pesquisar por setor ou ramal..."
                    />
                </div>
                <select
                    className="w-full md:w-[150px] border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={itensPorPagina}
                    onChange={(e) => handleChangeItensPorPagina(parseInt(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={-1}>Todos</option>
                </select>
                <button
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-md transition"
                    onClick={abrirModalCriacao}
                >
                    <FaPlus size={14} />
                    Adicionar Ramal
                </button>
            </div>

            <div className="relative flex-1 flex items-start justify-center py-6 px-3">
                <div className="p-4 w-full max-w-4xl">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Gerenciar Ramais</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <ul className="divide-y divide-gray-300">
                            {itensExibidos.length > 0 ? (
                                itensExibidos.map((ramal) => (
                                    <li key={ramal.id} className="flex flex-row justify-between gap-2 p-3 items-center">
                                        <div className="flex flex-col max-w-[60%]">
                                            <span className="font-medium text-gray-800">{ramal.setor}</span>
                                            <span className="text-sm text-gray-500">{ramal.ramal}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="cursor-pointer w-20 text-sm px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500 transition text-center"
                                                onClick={() => abrirModalEdicao(ramal)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="cursor-pointer w-20 text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
                                                onClick={() => removerRamal(ramal.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">Nenhum ramal encontrado.</p>
                            )}
                        </ul>

                        {/* Paginação */}
                        {itensExibidos.length > 0 && (
                            <div className="flex justify-center gap-4 items-center mt-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className={`px-3 py-1 rounded ${currentPage === 1
                                        ? "bg-gray-300 cursor-not-allowed text-white"
                                        : "bg-[#3D4A7B] hover:bg-[#2b365b] cursor-pointer text-white"
                                        }`}
                                >
                                    &larr;
                                </button>
                                <span>
                                    Página {currentPage} de {totalPaginas}
                                </span>
                                <button
                                    disabled={currentPage === totalPaginas}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === totalPaginas
                                        ? "bg-gray-300 cursor-not-allowed text-white"
                                        : "bg-[#3D4A7B] hover:bg-[#2b365b] cursor-pointer text-white"
                                        }`}
                                >
                                    &rarr;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal para Adicionar Ramal */}
            {modalCriacaoAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            adicionarRamal();
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[30%] border border-gray-300"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">Adicionar Ramal</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Setor"
                            value={setor}
                            onChange={(e) => setSetor(e.target.value.toUpperCase())}
                        />
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Ramal"
                            value={ramal}
                            onChange={(e) => setRamal(e.target.value)}
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

            {/* Modal para Editar Ramal */}
            {modalEdicaoAberto && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            atualizarRamal();
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[30%] border border-gray-300"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">Editar Ramal</h2>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Setor"
                            value={novoSetor}
                            onChange={(e) => setNovoSetor(e.target.value.toUpperCase())}
                        />
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Ramal"
                            value={novoRamal}
                            onChange={(e) => setNovoRamal(e.target.value)}
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
