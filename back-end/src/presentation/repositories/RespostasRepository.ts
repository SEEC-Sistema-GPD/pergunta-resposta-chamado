import { Resposta } from "../../domain/types/Resposta.types.ts";
import { prisma } from "../../infra/database/prisma.ts";

export class RespostasRepository {

  async findAll(): Promise<Resposta[]> {
    const resposta = await prisma.respostas.findMany({
      select: {
        id: true,
        categoria_id: true,
        titulo: true,
        descricao: true,        
        causa: true,
        resposta: true,
        passos: true,
        data_criacao: true,
      },
    });

    return resposta;
  }

  async findById(id: string): Promise<Resposta | null> {
    const resposta = await prisma.respostas.findUnique({
      where: {
        id: id,
      },
      include: {
        categorias: true,
      }
    });

    return resposta;
  }
  
  async findByCategoria(categoria_id: string): Promise<Resposta[] | null> {
    const respostas = await prisma.respostas.findMany({
      where: {
        categoria_id: categoria_id,
      },
      include: {
        categorias: true,
      }
    });

    return respostas;
  }
}