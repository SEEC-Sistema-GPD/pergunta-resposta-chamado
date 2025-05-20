import { RespostasRepository } from "../repositories/RespostasRepository.ts";
import { Resposta, RespostaRequestDTO } from "../../domain/types/Resposta.types.ts";

export class RespostasService {

  private RespostasRepository: RespostasRepository;

  constructor() {
    this.RespostasRepository = new RespostasRepository();
  }

  async findAll() {
    const respostas = await this.RespostasRepository.findAll();
    if (!respostas) {
      return { message: "Nenhuma resposta encontrada" };
    } else {
      return respostas;
    }
  }

  async findById(id: number) {
    const resposta = await this.RespostasRepository.findById(id);
    if (!resposta) {
      return { message: "Resposta não encontrada" };
    } else {
      return resposta;
    }
  }

  async findByCategoria(categoria_id: number) {
    const respostas = await this.RespostasRepository.findByCategoria(categoria_id);
    if (!respostas) {
      return { message: "Nenhuma resposta encontrada" };
    } else {
      return respostas;
    }
  }

  async findByTitulo(titulo: string) {
    const respostas = await this.RespostasRepository.findByTitulo(titulo);
    if (!respostas) {
      return { message: "Nenhuma resposta encontrada" };
    } else {
      return respostas;
    }
  }

  async findByTituloECategoria(titulo: string, categoria_id: number) {
    const respostas = await this.RespostasRepository.findByTituloECategoria(titulo, categoria_id);
    if (!respostas) {
      return { message: "Nenhuma resposta encontrada" };
    } else {
      return respostas;
    }
  }

  async create(dto: RespostaRequestDTO) {
    try {
      const resposta = await this.RespostasRepository.create(dto);

      if (!resposta) {
        return { message: "Erro ao criar resposta" };
      }

      return resposta;
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      return { message: "Erro ao criar resposta" };
    }
  }
}