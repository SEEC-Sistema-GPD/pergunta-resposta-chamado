import { Router } from 'express';
import { RamaisController } from '../controllers/RamaisController.ts';

const ramaisController = new RamaisController();
const router = Router();

router.get('/', async (req, res) => {
    await ramaisController.findAll(req, res);
});

router.get('/:id', async (req, res) => {
    await ramaisController.findById(req, res);
});

router.post('/', async (req, res) => {
    await ramaisController.create(req, res);
});

router.put('/:id', async (req, res) => {
    await ramaisController.update(req, res);
});

router.delete('/:id', async (req, res) => {
    await ramaisController.delete(req, res);
});

export default router;
