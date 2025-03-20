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
            let valorBooleano: boolean;

            // Verifica o tipo do atributo 'super' no DTO e converte para booleano
            if (typeof dto.super === "string") {
                // Se for uma string, considera "1" como true e qualquer outra coisa como false
                valorBooleano = dto.super === "1";
            } else if (typeof dto.super === "number") {
                // Se for um número, considera 1 como true e qualquer outro valor como false
                valorBooleano = dto.super === 1;
            } else {
                // Caso já seja booleano, apenas atribui o valor diretamente
                valorBooleano = dto.super;
            }
            const usuario = await this.UsuariosRepository.atualizarPermissao(id, { super: valorBooleano });
            if (!usuario) {
                return { message: "Erro ao atualizar permissão do usuário" };
            }
            return usuario;
        }
        catch (error) {
            console.error("Erro ao atualizar permissão do usuário:", error);
            return { message: "Erro ao atualizar permissão do usuário" };
        }
    }

    async create(cpf: string, nome: string) {
        const usuario = await this.UsuariosRepository.create(cpf, nome);
        if (!usuario) {
            return { message: "Erro ao criar usuário" };
        }
        return usuario;
    }
}