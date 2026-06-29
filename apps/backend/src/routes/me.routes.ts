import { Router } from 'express';
import { uploadAvatarMiddleware } from '../config/multer.config';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireFreshUser } from '../middlewares/freshUser.middleware';

const router: Router = Router();

router.use(authMiddleware, requireFreshUser);

router.get('/', userController.getMe);
router.post(
    '/avatar',
    uploadAvatarMiddleware.single('avatar'),
    userController.uploadAvatar
);
router.patch('/', userController.updateProfile);

export default router;
