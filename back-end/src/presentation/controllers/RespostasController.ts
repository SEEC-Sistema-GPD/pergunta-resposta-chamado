import { Request, Response } from "express";
import { RespostasService } from "../services/RespostasService.ts";

export class RespostasController {
    private respostasService: RespostasService;

    constructor() {
        this.respostasService = new RespostasService();

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.findByCategoria = this.findByCategoria.bind(this);
        this.create = this.create.bind(this);
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
        console.log(req);
        const resposta = await this.respostasService.create(req.body);
        res.status(201).json(resposta);
    }
}