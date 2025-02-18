import { Request, Response } from "express";
import { RespostasService } from "../services/RespostasService.ts";

export class RespostasController {
    private respostasService: RespostasService;

    constructor() {
        this.respostasService = new RespostasService();

        this.findAll = this.findAll.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const respostas = await this.respostasService.findAll();
        res.status(200).json(respostas);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const resposta = await this.respostasService.findById(id);
        res.status(200).json(resposta);
    }

    async findByCategoria(req: Request, res: Response) {
        const { categoria_id } = req.params;
        const resposta = await this.respostasService.findByCategoria(categoria_id);
        res.status(200).json(resposta);
    }
}