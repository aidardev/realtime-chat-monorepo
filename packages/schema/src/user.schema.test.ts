import { describe, expect, it } from 'vitest';
import { UpdateProfileSchema } from './user.schema.js';

describe('UpdateProfileSchema', () => {
    it('rejects when both name and bio are missing', () => {
        const result = UpdateProfileSchema.safeParse({});
        expect(result.success).toBe(false);
    });

    it('accepts when only bio is provided', () => {
        const result = UpdateProfileSchema.safeParse({ bio: 'hello' });
        expect(result.success).toBe(true);
    });
});
