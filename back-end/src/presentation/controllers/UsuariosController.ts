import { Request, Response } from 'express';
import { UsuariosService } from '../services/UsuariosService.ts';

export class UsuarioController {
    private usuarioService: UsuariosService;

    constructor() {
        this.usuarioService = new UsuariosService();

        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.atualizarPermissao = this.atualizarPermissao.bind(this);
    }

    async findAll(req: Request, res: Response) {
        const usuarios = await this.usuarioService.findAll();
        res.status(200).json(usuarios);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const usuario = await this.usuarioService.findById(Number(id));
        res.status(200).json(usuario);
    }

    async atualizarPermissao(req: Request, res: Response) {
        const { id } = req.params;
        const usuario = await this.usuarioService.atualizarPermissao(Number(id), req.body);
        res.status(200).json(usuario);
    }
}