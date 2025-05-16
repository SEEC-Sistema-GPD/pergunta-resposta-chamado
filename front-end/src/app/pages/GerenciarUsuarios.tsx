import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Usuario = {
    id: number;
    cpf: string;
    nome: string;
    perfil: 'C' | 'R' | 'M';
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function formatarCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function GerenciarUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [perfilLogado, setPerfilLogado] = useState<'C' | 'R' | 'M' | null>(null);

    useEffect(() => {
        const perfilSalvo = localStorage.getItem("perfil") as 'C' | 'R' | 'M' | null;
        setPerfilLogado(perfilSalvo);

        async function fetchUsuarios() {
            try {
                const response = await fetch(`${backendUrl}/api/usuario/`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar usuários");
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }

        fetchUsuarios();
    }, []);

    const opcoesPerfil = (atual: 'C' | 'R' | 'M') => {
        if (atual === 'C') return [
            { label: "Tornar Restrito", valor: 'R' },
            { label: "Tornar Master", valor: 'M' },
        ];
        if (atual === 'R') return [
            { label: "Tornar Comum", valor: 'C' },
            { label: "Tornar Master", valor: 'M' },
        ];
        if (atual === 'M') return [
            { label: "Tornar Restrito", valor: 'R' },
            { label: "Tornar Comum", valor: 'C' },
        ];
        return [];
    };

    const togglePerfil = async (usuario: Usuario, novoPerfil: 'C' | 'R' | 'M') => {
        Swal.fire({
            title: "Tem certeza?",
            html: `O usuário <b>${usuario.nome}</b> terá seu perfil alterado para <b>${novoPerfil === 'C' ? 'Comum' : novoPerfil === 'R' ? 'Administrador Restrito' : 'Administrador Master'}</b>. Deseja continuar?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${backendUrl}/api/usuario/${usuario.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({ perfil: novoPerfil })
                    });

                    if (!response.ok) {
                        throw new Error("Erro ao atualizar perfil");
                    }

                    const usuarioAtualizado = await response.json();
                    setUsuarios(prev => prev.map(u => u.id === usuario.id ? usuarioAtualizado : u));

                    Swal.fire({
                        title: "Sucesso!",
                        html: `O perfil do usuário <b>${usuario.nome}</b> foi alterado com sucesso.`,
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Erro ao atualizar perfil:", error);
                    Swal.fire({
                        title: "Erro!",
                        text: "Ocorreu um erro ao atualizar o perfil do usuário.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="flex flex-col min-w-screen min-h-screen overflow-x-hidden bg-[#c4d2eb77]">
            <Header />
            <div className="flex items-center justify-center py-6 md:py-22">
                <div className="p-4 w-full max-w-[95vw] sm:max-w-4xl">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Gerenciar Usuários</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        {perfilLogado === 'M' ? (
                            <ul>
                                {usuarios.length > 0 ? (
                                    usuarios.map((usuario) => (
                                        <li key={usuario.id} className="flex flex-col sm:flex-row justify-between gap-2 p-2 border-b items-start">
                                            <span>{usuario.nome} ({formatarCPF(usuario.cpf)}) - Perfil: {usuario.perfil}</span>
                                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                                {opcoesPerfil(usuario.perfil).map(opcao => (
                                                    <button
                                                        key={opcao.valor}
                                                        onClick={() => togglePerfil(usuario, opcao.valor as 'C' | 'R' | 'M')}
                                                        className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        {opcao.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center">Nenhum usuário encontrado.</p>
                                )}
                            </ul>
                        ) : (
                            <p className="text-red-600 text-center font-semibold">Acesso negado. Apenas administradores master podem gerenciar usuários.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
