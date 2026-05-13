import { Router } from 'express';
import { conversationController } from '../controllers/conversation.controller';
import { messageController } from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.use(authMiddleware);

router.get('/', conversationController.getConversations);
router.post('/', conversationController.startConversation);
router.get('/:id', conversationController.getConversation);
router.post('/:id/messages', messageController.sendMessage);
router.get('/:id/messages', messageController.getMessages);

export default router;
