import { Router } from 'express';
import { conversationController } from '../controllers/conversation.controller.js';
import { messageController } from '../controllers/message.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireFreshUser } from '../middlewares/freshUser.middleware.js';

const router: Router = Router();

router.use(authMiddleware);

router.get('/', conversationController.getConversations);
router.post('/', conversationController.startConversation);
router.get('/:id', conversationController.getConversation);
router.post('/:id/messages', requireFreshUser, messageController.sendMessage);
router.get('/:id/messages', messageController.getMessages);

export default router;
