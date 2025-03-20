import { Categoria, CategoriaRequestDTO } from "../../domain/types/Categoria.type.ts";
import { prisma } from "../../infra/database/prisma.ts";

export class CategoriasRepository {

  async findAll(): Promise<Categoria[]> {
    const categorias = await prisma.categorias.findMany({
      where: {
        deletedAt: null,
      },
    });
    return categorias;
  }

  async findById(id: number): Promise<Categoria | null> {
    const categoria = await prisma.categorias.findUnique({
      where: {
        id: id,
      },
    });

    return categoria;
  }

  async create(dto: CategoriaRequestDTO): Promise<Categoria | null> {
    const categoria = await prisma.categorias.create({
        data: {
            nome: dto.nome,
        }
    });

    return categoria;
}

  async update(id: number, dto: CategoriaRequestDTO): Promise<Categoria | null> {
    const categoria = await prisma.categorias.update({
      where: {
        id: id,
      },
      data: {
        nome: dto.nome,
      },
    });

    return categoria;
  }

  async delete(id: number): Promise<Categoria | null> {
    const categoria = await prisma.categorias.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return categoria;
  }
}