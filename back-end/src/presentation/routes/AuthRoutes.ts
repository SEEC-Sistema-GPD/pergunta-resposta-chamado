import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController.ts';

const authController = new AuthController();
const router = Router();

router.post('/login', async (req, res) => authController.auth(req, res));
router.get('/signin', (req: Request, res: Response): void => {
    res.send('Faça login para acessar essa rota.');
});

export default router;