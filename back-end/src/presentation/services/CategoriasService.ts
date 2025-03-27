import { Categoria, CategoriaRequestDTO } from "../../domain/types/Categoria.type.ts";
import { CategoriasRepository } from "../repositories/CategoriasRepository.ts";

export class CategoriasService {

    private CategoriasRepository: CategoriasRepository;

    constructor() {
        this.CategoriasRepository = new CategoriasRepository();
    }

    async findAll() {
        const categorias = await this.CategoriasRepository.findAll();
        if (!categorias) {
            return { message: "Nenhuma categoria encontrada" };
        } else {
            return categorias;
        }
    }

    async findById(id: number) {
        const categoria = await this.CategoriasRepository.findById(id);
        if (!categoria) {
            return { message: "Categoria não encontrada" };
        } else {
            return categoria;
        }
    }

    async create(dto: CategoriaRequestDTO) {
        try {
            const nomeExistente = await this.CategoriasRepository.findByName(dto.nome);

            // Verifica se já existe uma categoria com o nome escolhido
            if (nomeExistente) {
                throw { status: 409, message: "Esse nome de categoria já está em uso." };
            }

            const categoria = await this.CategoriasRepository.create(dto);

            if (!categoria) {
                return { message: "Erro ao criar categoria" };
            }

            return categoria;
        } catch (error: any) {
            console.error("Erro ao criar categoria:", error);
            if (error.status === 409) {
                throw error;
            }
            return { message: "Erro ao criar categoria" };
        }
    }

    async update(id: number, dto: CategoriaRequestDTO) {
        try {
            const categoria = await this.CategoriasRepository.update(id, dto);
            if (!categoria) {
                return { message: "Erro ao atualizar categoria" };
            }
            return categoria;
        }
        catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            return { message: "Erro ao atualizar categoria" };
        }
    }

    async delete(id: number) {
        try {
            const categoria = await this.CategoriasRepository.delete(id);
            if (!categoria) {
                return { message: "Erro ao deletar categoria" };
            }
            return categoria;
        }
        catch (error) {
            console.error("Erro ao deletar categoria:", error);
            return { message: "Erro ao deletar categoria" };
        }
    }
}