import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireFreshUser } from '../middlewares/freshUser.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router: Router = Router();

router.use(authMiddleware, requireFreshUser, requireRole('ADMIN'));

router.get('/users', adminController.listUsers);

export default router;
