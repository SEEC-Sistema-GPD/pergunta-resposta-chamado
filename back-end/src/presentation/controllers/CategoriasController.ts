import { Request, Response } from 'express';
import { CategoriasService } from '../services/CategoriasService.ts';

export class CategoriaController {
    private categoriaService: CategoriasService;

    constructor() {
        this.categoriaService = new CategoriasService();

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const categorias = await this.categoriaService.findAll();
        res.status(200).json(categorias);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const categoria = await this.categoriaService.findById(Number(id));
        res.status(200).json(categoria);
    }

    async create(req: Request, res: Response) {
        try {
            const categoria = await this.categoriaService.create(req.body);
            res.status(201).json(categoria);
        } catch (error: any) {
            // Verifica se já existe uma categoria com o nome escolhido
            if (error.status === 409) {
                return res.status(409).json({ message: error.message });
            }

            console.error("Erro ao criar categoria:", error);
            res.status(500).json({ message: "Erro interno ao criar categoria" });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const categoria = await this.categoriaService.update(Number(id), req.body);
            res.status(200).json(categoria);
        } catch (error: any) {
            // Verifica se já existe uma categoria com o nome escolhido
            if (error.status === 409) {
                return res.status(409).json({ message: error.message });
            }

            console.error("Erro ao atualizar categoria:", error);
            res.status(500).json({ message: "Erro interno ao atualizar categoria" });
        }
    }


    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.categoriaService.delete(Number(id));
        res.status(204).send();
    }
}