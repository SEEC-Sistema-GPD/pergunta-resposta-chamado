import { Router } from "express";
import { UsuarioController } from "../controllers/UsuariosController.ts";
import { authenticateToken } from "../../infra/middlewares/authenticateToken.ts";
import { verificarMaster } from "../../infra/middlewares/verificarMaster.ts";

const usuarioController = new UsuarioController();
const router = Router();

router.get('/', async (req, res) => usuarioController.findAll(req, res));

router.get('/:id', async (req, res) => usuarioController.findById(req, res));

router.put(
    '/:id',
    authenticateToken,
    verificarMaster,
    async (req, res) => usuarioController.atualizarPermissao(req, res)
);

export default router;
