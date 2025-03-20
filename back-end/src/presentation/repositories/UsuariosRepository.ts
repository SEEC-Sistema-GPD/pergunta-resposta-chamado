import { Usuario, UsuarioRequestDTO } from "../../domain/types/Usuario.type.ts";
import { prisma } from "../../infra/database/prisma.ts";

export class UsuariosRepository {

  async findAll(): Promise<Usuario[]> {
    const usuarios = await prisma.usuarios.findMany({
      where: {
        deletedAt: null,
      },
    });
    return usuarios;
  }

  async findById(id: number): Promise<Usuario | null> {
    const usuario = await prisma.usuarios.findUnique({
      where: {
        id: id,
      },
    });
    return usuario;
  }

    async atualizarPermissao(id: number, dto: UsuarioRequestDTO): Promise<Usuario | null> {
      const usuario = await prisma.usuarios.update({
        where: {
          id: id,
        },
        data: {
          super: dto.super,
        },
      });
  
      return usuario;
    }

    async findByCpf(cpf: string): Promise<Usuario | null> {
      const usuario = await prisma.usuarios.findUnique({
        where: {
          cpf: cpf,
        },
      });
      return usuario;
    }

    async create(cpf: string, nome: string): Promise<Usuario | null> {
      const usuario = await prisma.usuarios.create({
        data: {
          cpf: cpf,
          nome: nome,          
        },
      });
      return usuario;
    }
}