import { RespostasRepository } from "../repositories/RespostasRepository.ts";
import { Resposta } from "../../domain/types/Resposta.types.ts";

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

  async findById(id: string) {
    const resposta = await this.RespostasRepository.findById(id);
    if (!resposta) {
      return { message: "Resposta não encontrada" };
    } else {
      return resposta;
    }
  }

  async findByCategoria(categoria_id: string) {
    const respostas = await this.RespostasRepository.findByCategoria(categoria_id);
    if (!respostas) {
      return { message: "Nenhuma resposta encontrada" };
    } else {
      return respostas;
    }
  }
}