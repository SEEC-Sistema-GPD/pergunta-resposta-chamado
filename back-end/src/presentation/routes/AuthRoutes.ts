import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.ts';

const authController = new AuthController();
const router = Router();

router.post('/login', async (req, res) => authController.auth(req, res));

export default router;