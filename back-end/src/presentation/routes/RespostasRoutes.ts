// src/presentation/routes/RespostasRoutes.ts
import { Router, Request, Response } from "express";
import { RespostasController } from "../controllers/RespostasController.ts";
import { authenticateToken } from "../../infra/middlewares/authenticateToken.ts";
import { upload } from "../../infra/middlewares/upload.ts";

const respostasController = new RespostasController();
const router = Router();

// Rota para download de arquivos anexados
router.get('/download/:filename', (req: Request, res: Response) => {
    respostasController.downloadArquivo(req, res);
});

router.get('/', authenticateToken, async (req, res) => respostasController.findAll(req, res));
router.get('/categoria/:categoria_id', async (req, res) => respostasController.findByCategoria(req, res));
router.get('/titulo/:titulo/categoria/:categoria_id', async (req, res) => respostasController.findByTituloECategoria(req, res));
router.get('/titulo/:titulo', async (req, res) => respostasController.findByTitulo(req, res));
router.get('/:id', async (req, res) => respostasController.findById(req, res));
router.post('/', upload.array('anexos'), async (req, res) => respostasController.create(req, res));

export default router;