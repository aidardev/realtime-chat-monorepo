import * as z from 'zod';
import { MessagePreviewSchema } from './message.schema.js';
import { PublicUserSchema, UserIdSchema } from './user.schema.js';

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

export const DirectConversationRequestSchema = z.object({
    isGroup: z.literal(false),
    userIds: z.array(UserIdSchema).length(1),
    name: z.never().optional(),
});

export const GroupConversationRequestSchema = z.object({
    isGroup: z.literal(true),
    userIds: z.array(UserIdSchema).min(2),
    name: z.string().trim().min(1).max(80),
});

export const ConversationRequestSchema = z.discriminatedUnion('isGroup', [
    DirectConversationRequestSchema,
    GroupConversationRequestSchema,
]);

export type ConversationListItem = z.infer<typeof ConversationListItemSchema>;
export type ConversationDetails = z.infer<typeof ConversationDetailsSchema>;
export type ConversationRequest = z.infer<typeof ConversationRequestSchema>;
export type GroupConversationRequest = z.infer<typeof GroupConversationRequestSchema>;
