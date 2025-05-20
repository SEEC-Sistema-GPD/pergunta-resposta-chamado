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

function traduzirPerfil(perfil: 'C' | 'R' | 'M') {
    switch (perfil) {
        case 'C': return 'Usuário Comum';
        case 'R': return 'Administrador Restrito';
        case 'M': return 'Administrador Master';
        default: return perfil;
    }
}

function corDoPerfil(perfil: 'C' | 'R' | 'M') {
    switch (perfil) {
        case 'C': return 'bg-gray-400';
        case 'R': return 'bg-[#D99C44]';
        case 'M': return 'bg-[#3D4A7B]';
        default: return 'bg-gray-200';
    }
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
                if (!response.ok) throw new Error("Erro ao buscar usuários");
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
            { label: "Administrador Restrito", valor: 'R' },
            { label: "Administrador Master", valor: 'M' },
        ];
        if (atual === 'R') return [
            { label: "Usuário Comum", valor: 'C' },
            { label: "Administrador Master", valor: 'M' },
        ];
        if (atual === 'M') return [
            { label: "Administrador Restrito", valor: 'R' },
            { label: "Usuário Comum", valor: 'C' },
        ];
        return [];
    };

    const togglePerfil = async (usuario: Usuario, novoPerfil: 'C' | 'R' | 'M') => {
        Swal.fire({
            title: "Tem certeza?",
            html: `O usuário <b>${usuario.nome}</b> terá seu perfil alterado para <b>${traduzirPerfil(novoPerfil)}</b>. Deseja continuar?`,
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

                    if (!response.ok) throw new Error("Erro ao atualizar perfil");

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
                                        <li
                                            key={usuario.id}
                                            className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 p-2 border-b"
                                        >
                                            <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left w-full sm:w-auto">
                                                <span className="font-medium text-base sm:text-[1rem]">{usuario.nome}</span>
                                                <span className="text-sm text-gray-600">{formatarCPF(usuario.cpf)}</span>
                                                <span
                                                    className={`text-white text-xs font-semibold px-2 py-1 rounded ${corDoPerfil(usuario.perfil)}`}
                                                >
                                                    {traduzirPerfil(usuario.perfil)}
                                                </span>
                                            </div>

                                            <div className="w-full sm:w-60">
                                                <select
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    defaultValue=""
                                                    onChange={(e) => {
                                                        const novoValor = e.target.value as 'C' | 'R' | 'M';
                                                        if (novoValor) togglePerfil(usuario, novoValor);
                                                        e.target.selectedIndex = 0;
                                                    }}
                                                >
                                                    <option disabled value="">Alterar perfil</option>
                                                    {opcoesPerfil(usuario.perfil).map(opcao => (
                                                        <option key={opcao.valor} value={opcao.valor}>
                                                            {opcao.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center">Nenhum usuário encontrado.</p>
                                )}
                            </ul>
                        ) : (
                            <p className="text-red-600 text-center font-semibold">Apenas administradores master podem gerenciar usuários.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}