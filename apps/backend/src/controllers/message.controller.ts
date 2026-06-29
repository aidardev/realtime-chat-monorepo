import { SendMessageSchema } from '@realtime-chat/schema';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { requireUser } from '../lib/helpers';
import { messageService } from '../services/message.service';
import { IdParams } from '../types/http.types';

class MessageController {
    sendMessage = async (req: Request<IdParams>, res: Response) => {
        const user = requireUser(req);

        const { id: conversationId } = req.params;

        const messageData = SendMessageSchema.parse({
            ...req.body,
            id: conversationId,
        });

        const message = await messageService.createMessage(
            user.id,
            conversationId,
            messageData.content
        );

        res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: {
                message,
            },
        });
    };

    getMessages = async (req: Request<IdParams>, res: Response) => {
        const user = requireUser(req);

        const { id: conversationId } = req.params;

        const cursor =
            typeof req.query.cursor === 'string' ? req.query.cursor : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : 20;

        const { messages, hasMore } =
            await messageService.getMessagesByConversation(
                user.id,
                conversationId,
                { cursor, limit }
            );

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                messages,
                hasMore,
            },
        });
    };
}

export const messageController = new MessageController();
