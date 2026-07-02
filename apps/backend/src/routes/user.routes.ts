import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.use(authMiddleware);

router.get('/search', userController.searchUsers);

export default router;
