import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaTrash, FaPlus } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MySwal = withReactContent(Swal);

type Categoria = {
    id: number;
    nome: string;
};

export function GerenciarCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [modalCriacaoAberto, setModalCriacaoAberto] = useState(false);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
    const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
    const [novoNomeCategoria, setNovoNomeCategoria] = useState("");

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await fetch("http://localhost:3000/api/categoria/");
                if (!response.ok) {
                    throw new Error("Erro ao buscar categorias");
                }
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }

        fetchCategorias();
    }, []);

    async function adicionarCategoria() {
        if (!novaCategoria.trim()) {
            MySwal.fire("Erro", "O nome da categoria não pode estar vazio.", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/categoria/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novaCategoria }),
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar categoria");
            }

            const novaCategoriaCriada = await response.json();
            setCategorias((prevCategorias) => [...prevCategorias, novaCategoriaCriada]);

            setNovaCategoria("");
            setModalCriacaoAberto(false);

            MySwal.fire("Sucesso!", "Categoria adicionada com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao adicionar categoria:", error);
            MySwal.fire("Erro", "Não foi possível adicionar a categoria.", "error");
        }
    }

    async function atualizarCategoria() {
        if (!novoNomeCategoria.trim()) {
            MySwal.fire("Erro", "O nome da categoria não pode estar vazio.", "error");
            return;
        }

        if (categoriaEditando?.nome === novoNomeCategoria) {
            MySwal.fire("Erro", "O novo nome da categoria deve ser diferente do atual.", "error");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/categoria/${categoriaEditando?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novoNomeCategoria }),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar categoria");
            }

            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === categoriaEditando?.id
                        ? { ...categoria, nome: novoNomeCategoria }
                        : categoria
                )
            );

            setModalEdicaoAberto(false);
            setCategoriaEditando(null);
            MySwal.fire("Sucesso!", "Categoria atualizada com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            MySwal.fire("Erro", "Não foi possível atualizar a categoria.", "error");
        }
    }

    const confirmarRemocao = (id: number) => {
        MySwal.fire({
            title: "Tem certeza disso?",
            text: "Você não poderá reverter essa ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                removerCategoria(id);
            }
        });
    };

    async function removerCategoria(id: number) {
        try {
            const response = await fetch(`http://localhost:3000/api/categoria/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir a categoria");
            }

            setCategorias(categorias.filter(categoria => categoria.id !== id));

            MySwal.fire("Sucesso!", "Categoria excluída com sucesso!", "success");

        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
            MySwal.fire("Erro", "Não foi possível excluir a categoria.", "error");
        }
    }

    const abrirModalCriacao = () => setModalCriacaoAberto(true);
    const fecharModalCriacao = () => {
        setModalCriacaoAberto(false);
        setNovaCategoria("");
    };

    const abrirModalEdicao = (categoria: Categoria) => {
        setCategoriaEditando(categoria);
        setNovoNomeCategoria(categoria.nome);
        setModalEdicaoAberto(true);
    };

    return (
        <div className="flex flex-col min-w-screen min-h-screen bg-[#c4d2eb77]">
            <Header />
            <div className="flex items-center justify-center">
                <div className="p-4 w-[50%]">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Gerenciar Categorias</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <ul className="divide-y divide-gray-300">
                            {categorias.length > 0 ? (
                                categorias.map((categoria) => (
                                    <li key={categoria.id} className="flex justify-between p-3 items-center">
                                        <span className="font-medium text-gray-800">{categoria.nome}</span>
                                        <div className="flex gap-2">
                                            <button className="p-1 cursor-pointer" onClick={() => abrirModalEdicao(categoria)} data-tooltip-id="editarCategoria">
                                                <BsPencilSquare size={18} />
                                            </button>
                                            <Tooltip id="editarCategoria" place="top" content="Editar Categoria" />
                                            <button
                                                className="p-1 cursor-pointer"
                                                onClick={() => confirmarRemocao(categoria.id)}
                                                data-tooltip-id="excluirCategoria">
                                                <FaTrash size={18} color="#df0000" />
                                            </button>
                                            <Tooltip id="excluirCategoria" place="top" content="Excluir Categoria" />
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">Nenhuma categoria encontrada.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <button
                className="cursor-pointer fixed bottom-16 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
                onClick={abrirModalCriacao}
                data-tooltip-id="adicionarCategoria">
                <FaPlus size={18} />
            </button>
            <Tooltip id="adicionarCategoria" content="Adicionar Categoria" />
            <Footer />

            {/* Modal para Adicionar Categoria */}
            {modalCriacaoAberto && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[30%] border border-gray-300">
                    <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">Adicionar Categoria</h2>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                        placeholder="Nome da categoria"
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={fecharModalCriacao}>Cancelar</button>
                        <button
                            className="cursor-pointer px-4 py-2 bg-[#3D4A7B] text-white rounded hover:bg-[#2b365b]"
                            onClick={adicionarCategoria}
                        >
                            Adicionar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para Editar Categoria */}
            {modalEdicaoAberto && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[30%] border border-gray-300">
                    <h2 className="text-lg font-semibold mb-4 text-[#3D4A7B]">Editar Categoria</h2>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#3D4A7B]"
                        value={novoNomeCategoria}
                        onChange={(e) => setNovoNomeCategoria(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setModalEdicaoAberto(false)}>Cancelar</button>
                        <button className="cursor-pointer px-4 py-2 bg-[#3D4A7B] text-white rounded hover:bg-[#2b365b]" onClick={atualizarCategoria}>Salvar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
