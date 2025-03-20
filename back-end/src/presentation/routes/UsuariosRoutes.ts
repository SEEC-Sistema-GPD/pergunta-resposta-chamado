import { Router } from "express";
import { UsuarioController } from "../controllers/UsuariosController.ts";

const usuarioController = new UsuarioController();
const router = Router();

router.get('/', async (req, res) => usuarioController.findAll(req, res));

router.get('/:id', async (req, res) => usuarioController.findById(req, res));

router.put('/:id', async (req, res) => usuarioController.atualizarPermissao(req, res));

export default router;