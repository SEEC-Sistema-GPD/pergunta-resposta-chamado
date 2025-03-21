import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Usuario = {
    id: number;
    cpf: string;
    nome: string;
    super: boolean;
};

function formatarCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function GerenciarUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const response = await fetch("http://localhost:3000/api/usuario/");
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

    const togglePermissao = async (usuario: Usuario) => {
        // Alterna o valor da permissão de administrador
        const novoValor = !usuario.super;
        const acao = novoValor 
            ? "se <b>tornará administrador</b> do sistema" 
            : "terá o acesso de administrador do sistema <b>removido</b>";
    
        // Alerta de confirmação antes de alterar a permissão
        Swal.fire({
            title: 'Tem certeza disso?',
            html: `O usuário <b>${usuario.nome}</b> ${acao}. Deseja prosseguir?`, 
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) { // Se o usuário confirmar a ação
                try {
                    // Envia uma requisição para atualizar a permissão do usuário no backend
                    const response = await fetch(`http://localhost:3000/api/usuario/${usuario.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ super: novoValor }) // Atualiza o campo 'super'
                    });
    
                    // Verifica se a requisição foi bem-sucedida
                    if (!response.ok) {
                        throw new Error("Erro ao atualizar permissão");
                    }
    
                    // Atualiza o estado da lista de usuários com os novos dados
                    const usuarioAtualizado = await response.json();
                    setUsuarios(prev => prev.map(u => (u.id === usuarioAtualizado.id ? usuarioAtualizado : u)));
    
                    // Exibe um alerta de sucesso com destaque para o novo perfil do usuário
                    Swal.fire({
                        title: "Sucesso!",
                        html: `O usuário <b>${usuario.nome}</b> agora possui o perfil de <b>${novoValor ? "administrador" : "usuário comum"}</b> no sistema.`,
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Erro ao atualizar permissão:", error);
                    
                    // Exibe um alerta de erro caso ocorra alguma falha na requisição
                    Swal.fire({
                        title: "Erro!",
                        text: "Ocorreu um erro ao atualizar a permissão do usuário.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-[#c4d2eb77]">
            <Header />
            <div className="flex items-center justify-center">
                <div className="p-4 w-[50%]">
                    <div className="bg-[#3D4A7B] text-white p-4 rounded-t-lg">Gerenciar Usuários</div>
                    <div className="bg-white shadow-md rounded-b-lg p-4">
                        <ul>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <li key={usuario.id} className="flex justify-between p-2 border-b items-center">
                                        <span>{usuario.nome} ({formatarCPF(usuario.cpf)})</span>
                                        <button
                                            onClick={() => togglePermissao(usuario)}
                                            className={`w-[25%] px-3 py-1 rounded text-white cursor-pointer transition-all ${usuario.super ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                                        >
                                            {usuario.super ? "Remover admin" : "Tornar admin"}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">Nenhum usuário encontrado.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
