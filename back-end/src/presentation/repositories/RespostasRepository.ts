import { Resposta, RespostaRequestDTO } from "../../domain/types/Resposta.types.ts";
import { prisma } from "../../infra/database/prisma.ts";

export class RespostasRepository {
  async findAll(): Promise<Resposta[]> {
    return await prisma.respostas.findMany({
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
        arquivos: true,
      },
    });
  }

  async findById(id: number): Promise<Resposta | null> {
    return await prisma.respostas.findUnique({
      where: {
        id,
      },
      include: {
        categorias: {
          select: {
            id: true,
            nome: true,
          },
        },
        arquivos: true,
      },
    });
  }

  async findByCategoria(categoria_id: number): Promise<Resposta[] | null> {
    return await prisma.respostas.findMany({
      where: {
        categoria_id,
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
        arquivos: true,
      },
    });
  }

  async findByTitulo(titulo: string): Promise<Resposta[] | null> {
    return await prisma.respostas.findMany({
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
        arquivos: true,
      },
    });
  }

  async findByTituloECategoria(titulo: string, categoria_id: number): Promise<Resposta[]> {
    return await prisma.respostas.findMany({
      where: {
        titulo: {
          contains: titulo,
          mode: 'insensitive',
        },
        categoria_id,
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
        arquivos: true,
      },
    });
  }

  async create(dto: RespostaRequestDTO): Promise<Resposta> {
    const {
      titulo,
      descricao,
      causa,
      resposta: conteudoResposta,
      passos,
      categoria_id,
      arquivos,
    } = dto;

    const categoriaIdConvertido = Number(categoria_id);
    if (isNaN(categoriaIdConvertido)) {
      throw new Error("categoria_id inválido");
    }

    const novaResposta = await prisma.respostas.create({
      data: {
        titulo,
        descricao,
        causa,
        resposta: conteudoResposta,
        passos,
        categoria_id: categoriaIdConvertido,
        ...(arquivos && arquivos.length > 0 && {
          arquivos: {
            createMany: {
              data: arquivos.map((arquivo) => ({
                nomeOriginal: arquivo.nomeOriginal,
                nomeSalvo: arquivo.nomeSalvo,
                url: arquivo.url,
                tamanho: arquivo.tamanho,
                mimetype: arquivo.mimetype,
              })),
            },
          },
        }),
      },
      include: {
        arquivos: true,
      },
    });

    return novaResposta;
  }
}
