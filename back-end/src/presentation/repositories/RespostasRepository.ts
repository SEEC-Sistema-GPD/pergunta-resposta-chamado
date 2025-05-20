import { Resposta, RespostaRequestDTO } from "../../domain/types/Resposta.types.ts";
import { prisma } from "../../infra/database/prisma.ts";

export class RespostasRepository {

  async findAll(): Promise<Resposta[]> {
    const resposta = await prisma.respostas.findMany({
      where: {
        deletedAt: null,
        categorias: {
          deletedAt: null, 
        },
      },
      include: {
        categorias: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return resposta;
  }

  async findById(id: number): Promise<Resposta | null> {
    const resposta = await prisma.respostas.findUnique({
      where: {
        id: id,
        categorias: {
          deletedAt: null,
        },
      },
      include: {
        categorias: {
          select: {
            id: true,
            nome: true,
          },
        },
      }
    });

    return resposta;
  }

  async findByCategoria(categoria_id: number): Promise<Resposta[] | null> {
    const respostas = await prisma.respostas.findMany({
      where: {
        categoria_id: categoria_id,
        categorias: {
          deletedAt: null,
        },
      },
      include: {
        categorias: {
          select: {
            id: true,
            nome: true,
          },
        },
      }
    });

    return respostas;
  }

  async findByTitulo(titulo: string): Promise<Resposta[] | null> {
    const respostas = await prisma.respostas.findMany({
      where: {
        titulo: {
          contains: titulo,
          mode: 'insensitive',
        },
        categorias: {
          deletedAt: null,
        },
      },
      include: {
        categorias: true,
      },
    });

    return respostas;
  }

  async findByTituloECategoria(titulo: string, categoria_id: number): Promise<Resposta[]> {
    return await prisma.respostas.findMany({
        where: {
            titulo: {
                contains: titulo,
                mode: 'insensitive',
            },
            categoria_id: categoria_id,
            categorias: {
              deletedAt: null,
            },
        },
        include: {
            categorias: {
                select: {
                    id: true,
                    nome: true,
                },
            },
        },
    });
}

  async create(dto: RespostaRequestDTO): Promise<Resposta | null> {
    console.log(dto);
    const resposta = await prisma.respostas.create({
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        causa: dto.causa,
        resposta: dto.resposta,
        passos: dto.passos,
        categoria_id: dto.categoria_id,
      },
    });
    return resposta;
  }
}
