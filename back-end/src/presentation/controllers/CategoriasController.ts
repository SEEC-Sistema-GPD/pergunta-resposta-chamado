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
            if (error.status === 409) {
                return res.status(409).json({ message: error.message });
            }

            console.error("Erro ao atualizar categoria:", error);
            res.status(500).json({ message: "Erro interno ao atualizar categoria" });
        }
    }


    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const forcarExclusao = req.query.forcarExclusao === "true";

        try {
            const resultado = await this.categoriaService.delete(Number(id), forcarExclusao);

            if (resultado.bloqueado) {
                return res.status(200).json(resultado);
            }

            res.status(200).json({ message: resultado.message });
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
            res.status(500).json({ message: "Erro interno ao excluir categoria" });
        }
    }

    async checkVinculo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const total = await this.categoriaService.contarVinculos(Number(id));
            return res.status(200).json({
                bloqueado: total > 0,
                vinculadas: total,
            });
        } catch (error) {
            console.error("Erro ao verificar vínculos:", error);
            return res.status(500).json({ message: "Erro interno ao verificar vínculos" });
        }
    }
}