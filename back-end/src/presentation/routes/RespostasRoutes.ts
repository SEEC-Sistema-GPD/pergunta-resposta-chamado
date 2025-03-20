import { Router } from "express";
import { RespostasController } from "../controllers/RespostasController.ts";

const respostasController = new RespostasController();
const router = Router();

router.get('/', async (req, res) => respostasController.findAll(req, res));

router.get('/:id', async (req, res) => respostasController.findById(req, res));

router.get('/categoria/:categoria_id', async (req, res) => respostasController.findByCategoria(req, res));

router.get('/titulo/:titulo', async (req, res) => respostasController.findByTitulo(req, res));

router.get('/titulo/:titulo/categoria/:categoria_id', async (req, res) => respostasController.findByTituloECategoria(req, res));

router.post('/', async (req, res) => respostasController.create(req, res));

export default router;