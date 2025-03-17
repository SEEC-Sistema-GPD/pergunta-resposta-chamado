import { Router } from "express";
import { RespostasController } from "../controllers/RespostasController.ts";
import { authenticateToken } from "../../infra/middlewares/authenticateToken.ts";

const respostasController = new RespostasController();
const router = Router();

router.get('/', authenticateToken, async (req, res) => respostasController.findAll(req, res));

router.get('/:id', authenticateToken, async (req, res) => respostasController.findById(req, res));

router.get('/categoria/:categoria_id', authenticateToken,  async (req, res) => respostasController.findByCategoria(req, res));

router.post('/', authenticateToken, async (req, res) => respostasController.create(req, res));

export default router;