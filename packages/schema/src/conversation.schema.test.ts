import { describe, expect, it } from 'vitest';
import { ConversationRequestSchema } from './conversation.schema.js';

describe('ConversationRequestSchema', () => {
    it('requires exactly 1 userId for a direct conversation', () => {
        const tooMany = ConversationRequestSchema.safeParse({
            isGroup: false,
            userIds: ['a', 'b'],
        });
        expect(tooMany.success).toBe(false);
    });

    it('rejects name on a direct conversation', () => {
        const result = ConversationRequestSchema.safeParse({
            isGroup: false,
            userIds: ['a'],
            name: 'Not allowed',
        });
        expect(result.success).toBe(false);
    });

    it('requires at least 2 userIds for a group conversation', () => {
        const result = ConversationRequestSchema.safeParse({
            isGroup: true,
            userIds: ['a'],
            name: 'Group',
        });
        expect(result.success).toBe(false);
    });

    it('accepts a valid group conversation', () => {
        const result = ConversationRequestSchema.safeParse({
            isGroup: true,
            userIds: ['a', 'b'],
            name: 'Group',
        });
        expect(result.success).toBe(true);
    });
});
