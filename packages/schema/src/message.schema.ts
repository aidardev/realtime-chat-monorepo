import * as z from 'zod';
import { PublicUserSchema } from './user.schema';

export const SendMessageSchema = z.object({
    id: z.string(),
    content: z.string().trim().min(1).max(4000),
});

export const MessagePreviewSchema = z.object({
    id: z.string(),
    content: z.string(),
    senderId: z.string(),
    conversationId: z.string(),
    createdAt: z.string(),
});

export const MessageFullSchema = MessagePreviewSchema.extend({
    sender: PublicUserSchema,
});

export type MessagePreview = z.infer<typeof MessagePreviewSchema>;
export type MessageFull = z.infer<typeof MessageFullSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
