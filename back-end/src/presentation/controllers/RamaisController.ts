import { Request, Response } from 'express';
import { RamaisService } from '../services/RamaisService.ts';

export class RamaisController {
    private ramaisService: RamaisService;

    constructor() {
        this.ramaisService = new RamaisService();

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const data = await this.ramaisService.findAll();
        res.status(200).json(data);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await this.ramaisService.findById(Number(id));
        res.status(200).json(data);
    }

    async create(req: Request, res: Response) {
        try {
            const data = await this.ramaisService.create(req.body);
            res.status(201).json(data);
        } catch (error: any) {
            if (error.status === 409) {
                return res.status(409).json({ message: error.message });
            }
            console.error('Erro ao criar ramal:', error);
            res.status(500).json({ message: 'Erro interno ao criar ramal' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.ramaisService.update(Number(id), req.body);
            res.status(200).json(data);
        } catch (error: any) {
            if (error.status === 409) {
                return res.status(409).json({ message: error.message });
            }
            console.error('Erro ao atualizar ramal:', error);
            res.status(500).json({ message: 'Erro interno ao atualizar ramal' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.ramaisService.delete(Number(id));
            res.status(200).json(data);
        } catch (error) {
            console.error('Erro ao excluir ramal:', error);
            res.status(500).json({ message: 'Erro interno ao excluir ramal' });
        }
    }
}
