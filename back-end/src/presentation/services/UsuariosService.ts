import { Usuario, UsuarioRequestDTO } from "../../domain/types/Usuario.type.ts";
import { UsuariosRepository } from "../repositories/UsuariosRepository.ts";

export class UsuariosService {

    private UsuariosRepository: UsuariosRepository;

    constructor() {
        this.UsuariosRepository = new UsuariosRepository();
    }

    async findAll() {
        const usuarios = await this.UsuariosRepository.findAll();
        if (!usuarios) {
            return { message: "Nenhum usuário encontrado" };
        } else {
            return usuarios;
        }
    }

    async findById(id: number) {
        const usuario = await this.UsuariosRepository.findById(id);
        if (!usuario) {
            return { message: "Categoria não encontrada" };
        } else {
            return usuario;
        }
    }

    async findByCpf(cpf: string) {
        const usuario = await this.UsuariosRepository.findByCpf(cpf);
        return usuario;
    }

    async atualizarPermissao(id: number, dto: UsuarioRequestDTO) {
        try {
            // Verifica se o perfil é válido
            const perfisValidos = ['C', 'R', 'M'] as const;
            if (!perfisValidos.includes(dto.perfil)) {
                return { message: "Perfil inválido" };
            }

            const usuario = await this.UsuariosRepository.atualizarPermissao(id, {
                perfil: dto.perfil
            });

            if (!usuario) {
                return { message: "Erro ao atualizar perfil do usuário" };
            }

            return usuario;
        } catch (error) {
            console.error("Erro ao atualizar perfil do usuário:", error);
            return { message: "Erro ao atualizar perfil do usuário" };
        }
    }

    async create(cpf: string, nome: string) {
        const usuario = await this.UsuariosRepository.create({
            cpf,
            nome,
            perfil: 'C'
        });
        if (!usuario) {
            return { message: "Erro ao criar usuário" };
        }
        return usuario;
    }
}