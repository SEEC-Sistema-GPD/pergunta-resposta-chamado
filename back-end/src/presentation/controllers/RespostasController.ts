import { Request, Response } from "express";
import { RespostasService } from "../services/RespostasService.ts";
import path from "path";
import fs from "fs";

export class RespostasController {
  private respostasService: RespostasService;

  constructor() {
    this.respostasService = new RespostasService();

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.findByCategoria = this.findByCategoria.bind(this);
    this.findByTitulo = this.findByTitulo.bind(this);
    this.findByTituloECategoria = this.findByTituloECategoria.bind(this);
    this.create = this.create.bind(this);
    this.downloadArquivo = this.downloadArquivo.bind(this);
  }

  async findAll(req: Request, res: Response) {
    const respostas = await this.respostasService.findAll();
    res.status(200).json(respostas);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await this.respostasService.findById(Number(id));
    res.status(200).json(resposta);
  }

  async findByCategoria(req: Request, res: Response) {
    const { categoria_id } = req.params;
    const resposta = await this.respostasService.findByCategoria(Number(categoria_id));
    res.status(200).json(resposta);
  }

  async findByTitulo(req: Request, res: Response) {
    const { titulo } = req.params;
    const resposta = await this.respostasService.findByTitulo(String(titulo));
    res.status(200).json(resposta);
  }

  async findByTituloECategoria(req: Request, res: Response) {
    const { titulo, categoria_id } = req.params;
    const resposta = await this.respostasService.findByTituloECategoria(titulo, parseInt(categoria_id));
    res.status(200).json(resposta);
  }

  async create(req: Request, res: Response) {
    try {
      const dados = req.body;
      const arquivos = req.files as Express.Multer.File[] | undefined;

      const resposta = await this.respostasService.create({ ...dados, arquivos });
      res.status(201).json(resposta);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      res.status(500).json({ message: "Erro ao criar resposta" });
    }
  }

  async downloadArquivo(req: Request, res: Response) {
    try {
      const { filename } = req.params;
      const filePath = path.resolve("uploads", filename);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Arquivo não encontrado." });
      }

      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/octet-stream");
      return res.sendFile(filePath);
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
      return res.status(500).json({ message: "Erro ao baixar arquivo." });
    }
  }
}
