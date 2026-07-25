import { describe, expect, it } from 'vitest';
import { SendMessageSchema } from './message.schema.js';

describe('SendMessageSchema', () => {
    it('trims content before validating length', () => {
        const result = SendMessageSchema.parse({ id: 'c1', content: '  hi  ' });
        expect(result.content).toBe('hi');
    });

    it('rejects whitespace-only content', () => {
        const result = SendMessageSchema.safeParse({ id: 'c1', content: '   ' });
        expect(result.success).toBe(false);
    });

    it('rejects content over 4000 characters', () => {
        const result = SendMessageSchema.safeParse({
            id: 'c1',
            content: 'a'.repeat(4001),
        });
        expect(result.success).toBe(false);
    });
});
