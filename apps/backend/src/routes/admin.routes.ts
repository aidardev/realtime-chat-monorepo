import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireFreshUser } from '../middlewares/freshUser.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router: Router = Router();

router.use(authMiddleware, requireFreshUser, requireRole('ADMIN'));

router.get('/users', adminController.listUsers);

export default router;
