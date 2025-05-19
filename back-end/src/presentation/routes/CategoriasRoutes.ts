import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriasController.ts";
import { authenticateToken } from "../../infra/middlewares/authenticateToken.ts";

const categoriaController = new CategoriaController();
const router = Router();

router.get('/', async (req, res) => {
    await categoriaController.findAll(req, res);
});

router.get('/:id', async (req, res) => {
    await categoriaController.findById(req, res);
});

router.post('/', async (req, res) => {
    await categoriaController.create(req, res);
});

router.put('/:id', async (req, res) => {
    await categoriaController.update(req, res);
});

router.delete('/:id', async (req, res) => {
    await categoriaController.delete(req, res);
});

export default router;
