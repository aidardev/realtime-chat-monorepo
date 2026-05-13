import * as z from 'zod';
import { MessagePreviewSchema } from './message.schema';
import { PublicUserSchema } from './user.schema';

export const ConversationParticipantSchema = z.object({
    conversationId: z.string(),
    joinedAt: z.string(),
    userId: z.string(),
    user: PublicUserSchema,
});

export const ConversationBaseSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    isGroup: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const ConversationListItemSchema = ConversationBaseSchema.extend({
    participants: z.array(ConversationParticipantSchema),
    lastMessage: MessagePreviewSchema.nullable(),
});

export const ConversationDetailsSchema = ConversationBaseSchema.extend({
    participants: z.array(ConversationParticipantSchema),
});

export const ConversationRequestSchema = z.object({
    name: z.string().optional(),
    isGroup: z.boolean(),
    userIds: z.array(z.string()),
});

export type ConversationListItem = z.infer<typeof ConversationListItemSchema>;
export type ConversationDetails = z.infer<typeof ConversationDetailsSchema>;
export type ConversationRequest = z.infer<typeof ConversationRequestSchema>;
