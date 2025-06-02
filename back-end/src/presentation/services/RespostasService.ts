import { RespostasRepository } from "../repositories/RespostasRepository.ts";
import { RespostaRequestDTO } from "../../domain/types/Resposta.types.ts";

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

  async create(dados: any) {
    try {
      const arquivos = dados.arquivos as Express.Multer.File[] | undefined;

      const {
        titulo,
        descricao,
        causa,
        resposta,
        passos,
        categoria_id
      } = dados;

      const dto: RespostaRequestDTO = {
        titulo,
        descricao,
        causa,
        resposta,
        passos,
        categoria_id: Number(categoria_id),
        arquivos: []
      };

      if (arquivos && arquivos.length > 0) {
        dto.arquivos = arquivos.map(file => ({
          nomeOriginal: decodeURIComponent(escape(file.originalname)),
          nomeSalvo: file.filename,
          url: `/uploads/${file.filename}`,
          tamanho: file.size,
          mimetype: file.mimetype
        }));
      }

      const respostaCriada = await this.RespostasRepository.create(dto);

      if (!respostaCriada) {
        return { message: "Erro ao criar resposta" };
      }

      return respostaCriada;
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      return { message: "Erro ao criar resposta" };
    }
  }
}
